// ─────────────────────────────────────────────
//  AirSafe AI — Medical Profile Screen
// ─────────────────────────────────────────────
import React from 'react';

import { COLORS, ZONE_META } from '../styles/tokens';
import { Badge, Card, CardTitle, PageHeader, ProfileRow } from '../components/Shared';
import type { MedicalProfile, HistoryEntry } from '../types';

// ── Static data ───────────────────────────────
const PROFILE: MedicalProfile = {
  initials:    'KM',
  name:        'Dr. Karim Mansouri',
  institution: 'CHU Lyon · Pulmonology Dept.',
  pathology:   'Chronic Bronchitis',
  age:         47,
  ierThreshold: 55,
  pm25Threshold: 25,
  coThreshold:  1.5,
  weights: { alpha: 0.45, beta: 0.30, gamma: 0.10, delta: 0.15 },
  sensitivity: 1.2,
};

const HISTORY: HistoryEntry[] = [
  { date: 'Apr 20', score: 62, zone: 'C' },
  { date: 'Apr 19', score: 81, zone: 'D' },
  { date: 'Apr 18', score: 67, zone: 'C' },
  { date: 'Apr 17', score: 48, zone: 'B' },
  { date: 'Apr 16', score: 29, zone: 'A' },
  { date: 'Apr 15', score: 33, zone: 'A' },
  { date: 'Apr 14', score: 51, zone: 'B' },
];

// ── Sub-components ────────────────────────────
const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div style={{
    width: 44, height: 44, borderRadius: '50%',
    background: '#DAE9F8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 600, color: COLORS.blue,
    flexShrink: 0,
  }}>
    {initials}
  </div>
);

const HistoryRow : React.FC<{ entry: HistoryEntry }> = ({ entry }) => {
  const zone  = ZONE_META[entry.zone];
  const color = COLORS[zone.color];
  return (
    <tr>
      <td style={{ fontSize: 9, color: COLORS.text, padding: '6px 0',
        borderBottom: `0.5px solid ${COLORS.border}` }}>
        {entry.date}
      </td>
      <td style={{ fontSize: 9, fontWeight: 600, color, padding: '6px 0',
        borderBottom: `0.5px solid ${COLORS.border}` }}>
        {entry.score}
      </td>
      <td style={{ textAlign: 'center', padding: '6px 0',
        borderBottom: `0.5px solid ${COLORS.border}` }}>
        <Badge color={zone.color}>
          {zone.label}
        </Badge>
      </td>
    </tr>
  );
};

// ── Main Profile Screen ───────────────────────
export const Profile: React.FC = () => (
  <>
    <PageHeader
      greeting="Medical Profile"
      title="Personalized IER Settings"
    />

    {/* Avatar + info + medical data */}
    <Card>
      {/* Avatar row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 12,
      }}>
        <Avatar initials={PROFILE.initials} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
            {PROFILE.name}
          </div>
          <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 2 }}>
            {PROFILE.institution}
          </div>
          <Badge color="amber" style={{ marginTop: 4 }}>
            High Sensitivity Profile
          </Badge>
        </div>
      </div>

      <CardTitle>Medical Data</CardTitle>

      <div>
        <ProfileRow label="Pathology"          value={PROFILE.pathology} />
        <ProfileRow label="Age"                value={`${PROFILE.age} years`} />
        <ProfileRow label="IER Alert Threshold"
          value={
            <span style={{ color: COLORS.amber }}>≥ {PROFILE.ierThreshold}</span>
          }
        />
        <ProfileRow label="PM2.5 Threshold"
          value={
            <span style={{ color: COLORS.amber }}>{PROFILE.pm25Threshold} µg/m³</span>
          }
        />
        <ProfileRow label="CO Threshold"
          value={`${PROFILE.coThreshold} ppm`}
        />
      </div>
    </Card>

    {/* Weighting formula */}
    <Card>
      <CardTitle>IER Weighting Formula</CardTitle>
      <div>
        <ProfileRow label="PM2.5 weight (α)" value={PROFILE.weights.alpha.toFixed(2)} />
        <ProfileRow label="CO weight (β)"    value={PROFILE.weights.beta.toFixed(2)}  />
        <ProfileRow label="Temp weight (γ)"  value={PROFILE.weights.gamma.toFixed(2)} />
        <ProfileRow label="Humidity weight (δ)" value={PROFILE.weights.delta.toFixed(2)} />
      </div>
      <div style={{
        background: COLORS.page, borderRadius: 8,
        padding: '8px 10px', marginTop: 8,
        fontSize: 9, color: COLORS.text,
        fontFamily: 'monospace', lineHeight: 1.6,
      }}>
        IER = α·PM₂.₅ + β·CO + γ·T + δ·H<br/>
        <span style={{ color: COLORS.muted }}>
          Adjusted for bronchitis sensitivity ×{PROFILE.sensitivity}
        </span>
      </div>
    </Card>

    {/* 7-day history */}
    <Card>
      <CardTitle>7-Day IER History</CardTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Date', 'IER Score', 'Level'].map((h, i) => (
              <th key={h} style={{
                fontSize: 8, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                color: COLORS.muted, padding: '4px 0',
                textAlign: i === 2 ? 'center' : 'left',
                borderBottom: `0.5px solid ${COLORS.border}`,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((entry, i) => {
            const isLast = i === HISTORY.length - 1;
            const zone   = ZONE_META[entry.zone];
            const color  = COLORS[zone.color];
            return (
              <tr key={entry.date}>
                <td style={{
                  fontSize: 9, color: COLORS.text, padding: '6px 0',
                  borderBottom: isLast ? 'none' : `0.5px solid ${COLORS.border}`,
                }}>
                  {entry.date}
                </td>
                <td style={{
                  fontSize: 9, fontWeight: 600, color, padding: '6px 0',
                  borderBottom: isLast ? 'none' : `0.5px solid ${COLORS.border}`,
                }}>
                  {entry.score}
                </td>
                <td style={{
                  textAlign: 'center', padding: '6px 0',
                  borderBottom: isLast ? 'none' : `0.5px solid ${COLORS.border}`,
                }}>
                  <Badge color={zone.color}>{zone.label}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  </>
);
