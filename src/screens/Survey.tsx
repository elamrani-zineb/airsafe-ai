// ─────────────────────────────────────────────
//  AirSafe AI — Daily Survey Screen
// ─────────────────────────────────────────────
import React, { useState } from 'react';
import { COLORS } from '../styles/tokens';
import { Card, CardTitle, PageHeader } from '../components/Shared';
import {
  IconFatigue, IconCough, IconBreathing, IconHeadache,
  IconSport, IconWalk, IconRest,
  IconInfo, IconSend,
} from '../components/Icons';
import type { SymptomItem, ActivityType } from '../types';

// ── Data ─────────────────────────────────────
const SYMPTOMS: SymptomItem[] = [
  { id: 'fatigue',   label: 'Fatigue'   },
  { id: 'cough',     label: 'Cough'     },
  { id: 'breathing', label: 'Breathing' },
  { id: 'headache',  label: 'Headache'  },
];

const SYMPTOM_ICONS: Record<SymptomItem['id'], React.FC<{ size?: number; stroke?: string }>> = {
  fatigue:   IconFatigue,
  cough:     IconCough,
  breathing: IconBreathing,
  headache:  IconHeadache,
};

const ACTIVITIES: { id: ActivityType; label: string }[] = [
  { id: 'sport', label: 'Sport' },
  { id: 'walk',  label: 'Walk'  },
  { id: 'rest',  label: 'Rest'  },
];

const ACTIVITY_ICONS: Record<ActivityType, React.FC<{ size?: number; stroke?: string }>> = {
  sport: IconSport,
  walk:  IconWalk,
  rest:  IconRest,
};

// ── Survey Screen ────────────────────────────
export const Survey: React.FC = () => {
  const [activeSymptoms, setActiveSymptoms] = useState<Set<SymptomItem['id']>>(
    new Set(['breathing'])
  );
  const [intensity, setIntensity]   = useState(6);
  const [activity, setActivity]     = useState<ActivityType>('walk');
  const [aiText, setAiText]         = useState('');
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const toggleSymptom = (id: SymptomItem['id']) => {
    setActiveSymptoms(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
  next.delete(id);
} else {
  next.add(id);
}
      return next;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitted(true);
    setAiText('Analysing…');

    const symptoms = [...activeSymptoms].join(', ') || 'none';
    const prompt = `AirSafe AI clinical assistant. Patient: 47yo with chronic bronchitis. Current air: IER 62 (Zone C Risky), PM2.5 38µg/m³, CO 2.4ppm. Symptoms reported: ${symptoms}. Intensity: ${intensity}/10. Activity: ${activity}. Give a concise 2-sentence respiratory risk assessment and one practical recommendation. Be clinical and brief.`;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (window as any).claude?.complete(prompt);
      setAiText(result ?? fallbackText(symptoms, intensity));
    } catch {
      setAiText(fallbackText(symptoms, intensity));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        greeting="How are you feeling?"
        title="Daily Symptom Survey"
        date="Sunday, April 20 · Morning check-in"
      />

      {/* Symptom toggles */}
      <Card style={{ marginBottom: 4 }}>
        <CardTitle>Symptoms Present</CardTitle>
      </Card>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 6, margin: '0 12px 8px',
      }}>
        {SYMPTOMS.map(s => {
          const isActive = activeSymptoms.has(s.id);
          const IconComp = SYMPTOM_ICONS[s.id];
          return (
            <button
              key={s.id}
              onClick={() => toggleSymptom(s.id)}
              style={{
                background: isActive ? '#EFF6FF' : COLORS.card,
                border: `0.5px solid ${isActive ? COLORS.blue : COLORS.border}`,
                borderRadius: 12,
                padding: '10px 8px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 5,
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <IconComp size={22} stroke={isActive ? COLORS.blue : COLORS.muted} />
              <span style={{
                fontSize: 9, fontWeight: 500,
                color: isActive ? COLORS.blue : COLORS.muted,
              }}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Intensity Slider */}
      <Card>
        <CardTitle>Symptom Intensity</CardTitle>
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 8,
          }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: COLORS.text }}>
              How severe?
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.blue }}>
              {intensity}
            </span>
          </div>
          <input
            type="range"
            className="intensity-slider"
            min={0} max={10} value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
          />
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 4,
          }}>
            {['0 – None', '5 – Moderate', '10 – Severe'].map(t => (
              <span key={t} style={{ fontSize: 8, color: COLORS.muted }}>{t}</span>
            ))}
          </div>
        </div>
      </Card>

      {/* Activity Selector */}
      <Card style={{ marginBottom: 4 }}>
        <CardTitle>Today's Activity Level</CardTitle>
      </Card>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 6, margin: '0 12px 8px',
      }}>
        {ACTIVITIES.map(a => {
          const isActive = activity === a.id;
          const IconComp = ACTIVITY_ICONS[a.id];
          return (
            <button
              key={a.id}
              onClick={() => setActivity(a.id)}
              style={{
                background: isActive ? '#F0F7E4' : COLORS.card,
                border: `0.5px solid ${isActive ? COLORS.green : COLORS.border}`,
                borderRadius: 12, padding: '9px 4px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4,
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <IconComp size={22} stroke={isActive ? COLORS.green : COLORS.muted} />
              <span style={{
                fontSize: 9, fontWeight: 500,
                color: isActive ? COLORS.green : COLORS.muted,
              }}>
                {a.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        <IconSend size={13} />
        {loading ? 'Analysing…' : 'Analyse with AI'}
      </button>

      {/* AI Response */}
      {submitted && (
        <div style={{
          margin: '0 12px 8px',
          background: COLORS.card,
          border: `0.5px solid ${COLORS.border}`,
          borderRadius: 12, padding: '10px 12px',
          fontSize: 9, color: COLORS.muted, lineHeight: 1.6,
          minHeight: 60,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 500, color: COLORS.blue,
            marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <IconInfo size={10} />
            AirSafe AI Analysis
          </div>
          {aiText}
        </div>
      )}
    </>
  );
};

// ── Fallback if Claude is unavailable ────────
function fallbackText(symptoms: string, intensity: number): string {
  if (intensity >= 7) {
    return `Based on your bronchitis profile and current Zone C air quality, your reported ${symptoms} at intensity ${intensity}/10 warrants medical attention. Avoid all outdoor activities and use your bronchodilator as prescribed.`;
  }
  return `Based on your bronchitis profile and current Zone C air quality, your reported ${symptoms} at intensity ${intensity}/10 warrants caution. Limit outdoor activity to under 20 minutes and use your bronchodilator if symptoms worsen.`;
}
