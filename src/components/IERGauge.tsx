// ─────────────────────────────────────────────
//  AirSafe AI — IER Radial Gauge Component
// ─────────────────────────────────────────────
import React from 'react';
import { COLORS, scoreToColor, scoreToZone, ZONE_META } from '../styles/tokens';
import { Badge, ZoneDot } from './Shared';

interface IERGaugeProps {
  score: number;
}

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 226.2
// We use a 270° arc (¾ circle). Visible arc length:
const ARC = CIRCUMFERENCE * 0.75; // ≈ 169.6

export const IERGauge: React.FC<IERGaugeProps> = ({ score }) => {
  const zone     = scoreToZone(score);
  const color    = scoreToColor(score);
  const zoneMeta = ZONE_META[zone];
  const fill     = ARC * (score / 100);
  const gap      = CIRCUMFERENCE - fill;

  return (
    <div style={{
      background: COLORS.card,
      border: `0.5px solid ${COLORS.border}`,
      borderRadius: 12,
      margin: '0 12px 8px',
      padding: '12px',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.06em',
        color: COLORS.muted, marginBottom: 10,
      }}>
        Index d'Exposition Respiratoire
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Gauge */}
        <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
          <svg viewBox="0 0 90 90" fill="none" style={{ width: '100%', height: '100%' }}>
            {/* track */}
            <circle
              cx="45" cy="45" r={RADIUS}
              stroke={COLORS.border} strokeWidth="7" fill="none"
              strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
              transform="rotate(135 45 45)"
            />
            {/* fill */}
            <circle
              cx="45" cy="45" r={RADIUS}
              stroke={color} strokeWidth="7" fill="none"
              strokeDasharray={`${fill} ${gap}`}
              strokeLinecap="round"
              transform="rotate(135 45 45)"
              style={{ transition: 'stroke-dasharray 0.4s ease, stroke 0.3s ease' }}
            />
          </svg>
          {/* center label */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 22, fontWeight: 600, color, lineHeight: 1 }}>
              {score}
            </span>
            <span style={{ fontSize: 8, color: COLORS.muted, marginTop: 2 }}>/ 100</span>
          </div>
        </div>

        {/* Meta */}
        <div style={{ flex: 1 }}>
          <Badge color={zoneMeta.color} style={{ marginBottom: 5 }}>
            <ZoneDot color={zoneMeta.color} />
            Zone {zone} — {zoneMeta.label}
          </Badge>
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3, lineHeight: 1.4 }}>
            {zone === 'A' && 'Air quality is good. No restrictions needed today.'}
            {zone === 'B' && 'Air quality is acceptable. Sensitive groups should be cautious.'}
            {zone === 'C' && 'Air quality is degraded. Sensitive individuals should limit outdoor exposure today.'}
            {zone === 'D' && 'Air quality is critical. Avoid all non-essential outdoor activities.'}
          </div>
          <div style={{ marginTop: 6, fontSize: 9, color: COLORS.muted }}>
            Updated 8:52 AM
          </div>
        </div>
      </div>
    </div>
  );
};
