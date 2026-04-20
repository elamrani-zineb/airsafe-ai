// ─────────────────────────────────────────────
//  AirSafe AI — Dashboard Screen
// ─────────────────────────────────────────────
import React from 'react';
import { COLORS } from '../styles/tokens';
import { IERGauge } from '../components/IERGauge';
import { Badge, Card, CardTitle, MiniBar, RiskBar, PageHeader } from '../components/Shared';
import {
  IconBell, IconLocation,
  IconPM25, IconCO, IconTemp, IconHumidity,
} from '../components/Icons';
import type { SensorReading, ForecastDay } from '../types';

// ── Static data ──────────────────────────────
const IER_SCORE = 62;

const SENSORS: SensorReading[] = [
  { id: 'pm25',     name: 'PM2.5',   value: 38,  unit: 'µg/m³',   color: 'amber', percent: 58 },
  { id: 'co',       name: 'CO',      value: 2.4, unit: 'ppm',      color: 'red',   percent: 72 },
  { id: 'temp',     name: 'Temp',    value: 17,  unit: 'Celsius',  color: 'blue',  percent: 40 },
  { id: 'humidity', name: 'Humidity',value: 64,  unit: 'Relative', color: 'green', percent: 64 },
];

const FORECAST: ForecastDay[] = [
  { day: 'Mon', score: 61, color: 'amber' },
  { day: 'Tue', score: 34, color: 'green' },
  { day: 'Wed', score: 29, color: 'green' },
  { day: 'Thu', score: 48, color: 'blue'  },
  { day: 'Fri', score: 81, color: 'red'   },
];

const RISK_PCT = 68;

// ── Sensor icon map ──────────────────────────
const SensorIconMap: Record<SensorReading['id'], {
  icon: React.FC<{ size?: number; stroke?: string }>;
  bg: string;
  iconColor: string;
}> = {
  pm25:     { icon: IconPM25,     bg: '#FEF3C7', iconColor: COLORS.amber },
  co:       { icon: IconCO,       bg: '#FEE2E2', iconColor: COLORS.red   },
  temp:     { icon: IconTemp,     bg: '#DBEAFE', iconColor: COLORS.blue  },
  humidity: { icon: IconHumidity, bg: '#DCFCE7', iconColor: COLORS.green },
};

// ── Sub-components ───────────────────────────
const SensorCard: React.FC<{ sensor: SensorReading }> = ({ sensor }) => {
  const meta = SensorIconMap[sensor.id];
  const IconComp = meta.icon;
  const color = COLORS[sensor.color];

  return (
    <div style={{
      background: COLORS.card,
      border: `0.5px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: '9px 10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: meta.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconComp size={14} stroke={meta.iconColor} />
        </div>
        <span style={{ fontSize: 9, color: COLORS.muted, fontWeight: 500 }}>
          {sensor.name}
        </span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color, lineHeight: 1 }}>
        {sensor.value}
        {sensor.id === 'temp' ? '°' : ''}
      </div>
      <div style={{ fontSize: 8, color: COLORS.muted, marginTop: 1 }}>{sensor.unit}</div>
      <MiniBar percent={sensor.percent} color={color} />
    </div>
  );
};

const ForecastDot: React.FC<{ day: ForecastDay }> = ({ day }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 4,
  }}>
    <span style={{ fontSize: 8, color: COLORS.muted, fontWeight: 500 }}>{day.day}</span>
    <div style={{
      width: 8, height: 8, borderRadius: '50%',
      background: COLORS[day.color],
    }} />
    <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.text }}>{day.score}</span>
  </div>
);

// ── Main Dashboard Screen ────────────────────
export const Dashboard: React.FC = () => {
  const riskColor = RISK_PCT >= 70 ? COLORS.red : RISK_PCT >= 45 ? COLORS.amber : COLORS.green;
  const riskLabel = RISK_PCT >= 70 ? 'High'     : RISK_PCT >= 45 ? 'Elevated' : 'Low';
  const riskBadge: 'red' | 'amber' | 'green' =
    RISK_PCT >= 70 ? 'red' : RISK_PCT >= 45 ? 'amber' : 'green';

  return (
    <>
      {/* Header */}
      <PageHeader
        greeting="Good morning, Dr. Karim"
        title={
          <>
            <IconLocation size={9} />
            {' '}Lyon, Confluence
          </>
        }
        date="Sunday, April 20 · Air report"
        action={<IconBell size={18} stroke={COLORS.muted} />}
      />

      {/* IER Gauge */}
      <IERGauge score={IER_SCORE} />

      {/* Sensor Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 6, margin: '0 12px 8px',
      }}>
        {SENSORS.map(s => <SensorCard key={s.id} sensor={s} />)}
      </div>

      {/* Risk Prediction */}
      <Card>
        <CardTitle>AI Risk Prediction · Next 6h</CardTitle>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 8,
        }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, color: riskColor }}>{RISK_PCT}%</div>
            <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 1 }}>
              Risk of symptom onset
            </div>
          </div>
          <Badge color={riskBadge}>{riskLabel}</Badge>
        </div>
        <RiskBar percent={RISK_PCT} color={riskColor} />
        <div style={{ fontSize: 9, color: COLORS.muted, lineHeight: 1.5 }}>
          Based on your bronchitis profile, current PM2.5 and CO levels exceed
          your personalized thresholds. Consider wearing a mask outdoors.
        </div>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardTitle>5-Day IER Forecast</CardTitle>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', padding: '0 4px',
        }}>
          {FORECAST.map(f => <ForecastDot key={f.day} day={f} />)}
        </div>
      </Card>
    </>
  );
};
