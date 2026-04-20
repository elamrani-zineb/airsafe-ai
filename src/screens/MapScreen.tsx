// ─────────────────────────────────────────────
//  AirSafe AI — Map Screen
// ─────────────────────────────────────────────
import React from 'react';
import { COLORS } from '../styles/tokens';
import { Card, CardTitle, PageHeader } from '../components/Shared';
import { IconAlert } from '../components/Icons';

// ── Cartographic SVG Map ─────────────────────
const CartographicMap: React.FC = () => (
  <div style={{
    margin: '0 12px 8px',
    borderRadius: 12,
    overflow: 'hidden',
    border: `0.5px solid ${COLORS.border}`,
  }}>
    <svg viewBox="0 0 276 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block' }}>
      {/* Base */}
      <rect width="276" height="200" fill="#E8EDF2"/>

      {/* Water: Rhône */}
      <path d="M90 0 Q95 50 88 100 Q82 150 90 200"
        stroke="#B8D4EA" strokeWidth="14" fill="none"/>
      {/* Saône */}
      <path d="M60 0 Q65 40 62 80 Q60 120 58 200"
        stroke="#C2DAF0" strokeWidth="8" fill="none"/>

      {/* Parks */}
      <ellipse cx="200" cy="140" rx="30" ry="18" fill="#D4E8C2" opacity=".7"/>
      <rect x="30" y="120" width="20" height="14" rx="4" fill="#D4E8C2" opacity=".6"/>
      <ellipse cx="150" cy="30" rx="18" ry="10" fill="#D4E8C2" opacity=".5"/>

      {/* Buildings */}
      <g fill="#C8D0DA" opacity=".9">
        {[
          [110,10,22,14],[136,10,14,14],[154,10,18,10],[176,10,14,18],[194,10,18,12],[216,10,12,16],[232,10,20,10],
          [110,32,14,18],[128,32,20,12],[176,32,22,14],[202,32,14,18],[220,32,18,14],
          [110,60,16,14],[130,58,24,18],[158,60,14,12],[176,58,18,16],[198,60,22,14],[224,60,14,18],[242,60,20,12],
          [14,30,20,14],[38,30,16,18],[14,52,16,14],[34,52,22,10],[14,70,18,16],[36,70,14,14],
          [100,88,16,14],[120,86,22,18],[176,88,16,12],[196,88,20,16],[220,88,14,14],[238,88,18,18],
          [14,92,20,14],[38,92,14,18],[14,112,22,12],[40,112,16,16],
          [100,116,18,14],[122,116,20,18],[176,116,22,14],[202,116,14,18],[220,116,20,12],[244,116,14,16],
          [14,140,18,16],[36,140,22,12],[14,160,14,18],[32,160,20,14],
          [100,146,16,14],[120,144,22,18],[176,148,18,14],[198,146,14,18],[216,148,20,14],[240,148,16,18],
          [14,180,20,16],[38,180,16,14],[100,176,22,18],[126,178,14,16],
          [176,176,20,18],[200,178,16,14],[220,176,22,18],[246,178,16,14],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="2"/>
        ))}
      </g>

      {/* Road grid (minor) */}
      <g stroke="#fff" strokeWidth="1.5" opacity=".85">
        {[26,54,82,110,138,166].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="276" y2={y}/>
        ))}
        {[58,100,144,176,218,244].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200"/>
        ))}
      </g>
      {/* Arterials */}
      <g stroke="#fff" strokeWidth="2.5" opacity=".7">
        <line x1="0" y1="82" x2="276" y2="82"/>
        <line x1="144" y1="0" x2="144" y2="200"/>
      </g>

      {/* Zone A — green, NW */}
      <circle cx="48" cy="68" r="38" fill={COLORS.green} opacity=".18"/>
      <circle cx="48" cy="68" r="38" stroke={COLORS.green} strokeWidth="1" opacity=".5" fill="none"/>
      <text x="48" y="64" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill={COLORS.green} opacity=".9">A</text>
      <text x="48" y="74" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fill={COLORS.green} opacity=".7">Safe</text>

      {/* Zone B — blue, NE */}
      <circle cx="220" cy="55" r="34" fill={COLORS.blue} opacity=".15"/>
      <circle cx="220" cy="55" r="34" stroke={COLORS.blue} strokeWidth="1" opacity=".4" fill="none"/>
      <text x="220" y="51" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill={COLORS.blue} opacity=".9">B</text>
      <text x="220" y="61" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fill={COLORS.blue} opacity=".7">Moderate</text>

      {/* Zone C — amber, SW */}
      <circle cx="42" cy="165" r="30" fill={COLORS.amber} opacity=".18"/>
      <circle cx="42" cy="165" r="30" stroke={COLORS.amber} strokeWidth="1" opacity=".45" fill="none"/>
      <text x="42" y="161" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill={COLORS.amber} opacity=".9">C</text>
      <text x="42" y="171" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fill={COLORS.amber} opacity=".7">Risky</text>

      {/* Zone D — red, SE */}
      <circle cx="230" cy="160" r="34" fill={COLORS.red} opacity=".16"/>
      <circle cx="230" cy="160" r="34" stroke={COLORS.red} strokeWidth="1" opacity=".45" fill="none"/>
      <text x="230" y="156" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill={COLORS.red} opacity=".9">D</text>
      <text x="230" y="166" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fill={COLORS.red} opacity=".7">Critical</text>

      {/* User pin */}
      <circle cx="138" cy="100" r="6" fill={COLORS.blue} opacity=".2"/>
      <circle cx="138" cy="100" r="3.5" fill={COLORS.blue}/>
      <circle cx="138" cy="100" r="2" fill="#fff"/>
      <text x="138" y="91" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fontWeight="600" fill={COLORS.blue}>Vous</text>
    </svg>
  </div>
);

// ── Zone Legend ──────────────────────────────
const LEGEND_ITEMS = [
  { zone: 'A', color: COLORS.green, label: 'Safe',     range: 'IER < 35'  },
  { zone: 'B', color: COLORS.blue,  label: 'Moderate', range: '35–59'     },
  { zone: 'C', color: COLORS.amber, label: 'Risky',    range: '60–79'     },
  { zone: 'D', color: COLORS.red,   label: 'Critical', range: '≥ 80'      },
];

// ── Main Map Screen ──────────────────────────
export const MapScreen: React.FC = () => (
  <>
    <PageHeader
      greeting="Air Quality Zones"
      title="Lyon Metropolitan Area"
      date="Live · Updated 9:03 AM"
    />

    <CartographicMap />

    {/* Legend */}
    <Card>
      <CardTitle>Zone Legend</CardTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {LEGEND_ITEMS.map(item => (
          <div key={item.zone} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: item.color, flexShrink: 0,
            }}/>
            <span style={{ fontSize: 9, color: COLORS.muted }}>
              <strong style={{ color: COLORS.text }}>{item.zone}</strong>
              {' '}{item.label} · {item.range}
            </span>
          </div>
        ))}
      </div>
    </Card>

    {/* Alert card */}
    <div style={{
      background: '#FEF2F2',
      border: '0.5px solid #FCA5A5',
      borderRadius: 12,
      margin: '0 12px 8px',
      padding: '10px 12px',
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
    }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>
        <IconAlert size={18} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.red, marginBottom: 2 }}>
          Critical Zone D nearby
        </div>
        <div style={{ fontSize: 9, color: '#B91C1C', lineHeight: 1.5 }}>
          Zone D is 1.4 km SE. PM2.5 peaks at 112 µg/m³. Avoid exposure if possible
          and keep your inhaler accessible.
        </div>
      </div>
    </div>
  </>
);
