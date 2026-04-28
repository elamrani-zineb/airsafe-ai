// ─────────────────────────────────────────────
//  AirSafe AI — Medical Profile Screen
// ─────────────────────────────────────────────
import React, { useState } from 'react';
import { COLORS, ZONE_META } from '../styles/tokens';
import { Badge, Card, CardTitle, PageHeader, ProfileRow } from '../components/Shared';
import type { MedicalProfile, HistoryEntry } from '../types';

// ── Static data ───────────────────────────────
const PROFILE: MedicalProfile = {
  initials:      'KM',
  name:          'Dr. Karim Mansouri',
  institution:   'CHU Lyon · Pulmonology Dept.',
  pathology:     'Chronic Bronchitis',
  age:           47,
  ierThreshold:  55,
  pm25Threshold: 25,
  coThreshold:   1.5,
  weights: { alpha: 0.45, beta: 0.30, gamma: 0.10, delta: 0.15 },
  sensitivity:   1.2,
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

// ── Avatar ────────────────────────────────────
const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div style={{
    width: 48, height: 48,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #DAE9F8 0%, #C3D9F4 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, color: COLORS.blue,
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(55,138,221,.18)',
    letterSpacing: '0.5px',
  }}>
    {initials}
  </div>
);

// ── Logout Icon ───────────────────────────────
const LogoutIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="#E24B4A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 7.5H2.5M5.5 5l-3 2.5 3 2.5"/>
    <path d="M7 2.5h4a1 1 0 011 1v8a1 1 0 01-1 1H7"/>
  </svg>
);

// ── Logout Button ─────────────────────────────
const LogoutButton: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ margin: '0 12px 8px' }}>
      <button
        onClick={onLogout}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          height: 46,
          background: hovered ? '#FEF2F2' : 'transparent',
          border: `1.5px solid #E24B4A`,
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          color: '#E24B4A',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background .15s',
          letterSpacing: '0.01em',
        }}
      >
        <LogoutIcon />
        Se déconnecter
      </button>
    </div>
  );
};

// ── History Table Row ─────────────────────────
const HistoryTableRow: React.FC<{ entry: HistoryEntry; isLast: boolean }> = ({ entry, isLast }) => {
  const zone  = ZONE_META[entry.zone];
  const color = COLORS[zone.color];
  const cellBase: React.CSSProperties = {
    padding: '7px 0',
    borderBottom: isLast ? 'none' : `0.5px solid ${COLORS.border}`,
  };
  return (
    <tr>
      <td style={{ ...cellBase, fontSize: 9, color: COLORS.text }}>
        {entry.date}
      </td>
      <td style={{ ...cellBase, fontSize: 11, fontWeight: 700, color }}>
        {entry.score}
      </td>
      <td style={{ ...cellBase, textAlign: 'center' }}>
        <Badge color={zone.color}>{zone.label}</Badge>
      </td>
    </tr>
  );
};

// ── Main Profile Screen ───────────────────────
export interface ProfileProps {
  onLogout?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout }) => (
  <>
    <PageHeader
      greeting="Profil Médical"
      title="Paramètres IER Personnalisés"
    />

    {/* ── Avatar + Name + Institution ── */}
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Avatar initials={PROFILE.initials} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
            {PROFILE.name}
          </div>
          <div style={{ fontSize: 9, color: COLORS.muted, marginBottom: 5 }}>
            {PROFILE.institution}
          </div>
          <Badge color="amber">Profil haute sensibilité</Badge>
        </div>
      </div>

      {/* ── Medical Data ── */}
      <CardTitle>Données médicales</CardTitle>
      <ProfileRow label="Pathologie"            value={PROFILE.pathology} />
      <ProfileRow label="Âge"                   value={`${PROFILE.age} ans`} />
      <ProfileRow
        label="Seuil d'alerte IER"
        value={<span style={{ color: COLORS.amber, fontWeight: 600 }}>≥ {PROFILE.ierThreshold}</span>}
      />
      <ProfileRow
        label="Seuil PM2.5"
        value={<span style={{ color: COLORS.amber, fontWeight: 600 }}>{PROFILE.pm25Threshold} µg/m³</span>}
      />
      <ProfileRow
        label="Seuil CO"
        value={`${PROFILE.coThreshold} ppm`}
      />
    </Card>

    {/* ── Weighting Formula ── */}
    <Card>
      <CardTitle>Formule de pondération IER</CardTitle>
      <ProfileRow label="Poids PM2.5 (α)" value={PROFILE.weights.alpha.toFixed(2)} />
      <ProfileRow label="Poids CO (β)"    value={PROFILE.weights.beta.toFixed(2)}  />
      <ProfileRow label="Poids Temp. (γ)" value={PROFILE.weights.gamma.toFixed(2)} />
      <ProfileRow label="Poids Humid. (δ)" value={PROFILE.weights.delta.toFixed(2)} />
      <div style={{
        background: COLORS.page,
        borderRadius: 8,
        padding: '8px 10px',
        marginTop: 8,
        fontSize: 9,
        color: COLORS.text,
        fontFamily: 'monospace',
        lineHeight: 1.7,
      }}>
        IER = α·PM₂.₅ + β·CO + γ·T + δ·H<br />
        <span style={{ color: COLORS.muted }}>
          × ajustement bronchite ×{PROFILE.sensitivity}
        </span>
      </div>
    </Card>

    {/* ── 7-Day IER History ── */}
    <Card>
      <CardTitle>Historique IER — 7 jours</CardTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {(['Date', 'Score IER', 'Niveau'] as const).map((h, i) => (
              <th key={h} style={{
                fontSize: 8, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: COLORS.muted,
                padding: '4px 0',
                textAlign: i === 2 ? 'center' : 'left',
                borderBottom: `0.5px solid ${COLORS.border}`,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((entry, i) => (
            <HistoryTableRow
              key={entry.date}
              entry={entry}
              isLast={i === HISTORY.length - 1}
            />
          ))}
        </tbody>
      </table>
    </Card>

    {/* ── Logout ── */}
    <LogoutButton onLogout={onLogout} />

  </>
);
