import React, { useState } from 'react';
import {
  HeartHandshake,
  Heart,
  Baby,
  Scale,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatCard } from '../common/StatCard';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { PregnancyTracker } from './PregnancyTracker';
import { ChildVaccineScheduler } from './ChildVaccineScheduler';
import { GrowthMonitor } from './GrowthMonitor';
import { ReminderSimulatorModal } from './ReminderSimulatorModal';

export const MaternalChildHub = () => {
  const {
    pregnantMothers,
    childVaccinations,
    activeReminderModal,
    setActiveReminderModal,
  } = useHealthData();
  const { t } = useLanguage();

  const [activeSubTab, setActiveSubTab] = useState('mothers'); // 'mothers' | 'children' | 'growth'

  const totalMothers = pregnantMothers.length;
  const highRiskMothers = pregnantMothers.filter((m) => m.highRisk).length;
  const totalChildren = childVaccinations.length;
  const overdueVaccinesCount = childVaccinations.reduce((acc, child) => {
    return acc + child.vaccines.filter((v) => v.status === 'overdue').length;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Maternal & Child Hero Banner — aligned visually with Epidemic Radar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-9 shadow-xl border border-rose-900/50">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-bold border border-rose-400/30">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Janani &amp; Shishu Suraksha • National Universal Immunization (UIP)</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('maternalHeader', 'Maternal & Child Health Module')}
            </h2>
            <AudioVoiceButton
              text={`${t('maternalHeader')}. ${t('maternalSubheader')}. Track prenatal visits for mothers and timely vaccination milestones for infants.`}
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            />
          </div>

          <p className="text-xs sm:text-base text-rose-100/90 leading-relaxed font-medium max-w-3xl">
            {t(
              'maternalSubheader',
              'Sends automated reminders for vaccines and pregnancy checkups so mothers and babies don’t miss life-saving care.'
            )}
          </p>

          {/* Sub-tab buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setActiveSubTab('mothers')}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs border ${
                activeSubTab === 'mothers'
                  ? 'bg-white text-rose-950 border-white shadow-md'
                  : 'bg-rose-950/80 text-rose-100 hover:bg-rose-900 border-rose-500/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t('tabMothers', 'Pregnant Mothers (ANC)')} ({totalMothers})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('children')}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs border ${
                activeSubTab === 'children'
                  ? 'bg-white text-rose-950 border-white shadow-md'
                  : 'bg-rose-950/80 text-rose-100 hover:bg-rose-900 border-rose-500/50'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-sky-300" />
              <span>{t('tabChildren', 'Child Immunization (UIP)')} ({totalChildren})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('growth')}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs border ${
                activeSubTab === 'growth'
                  ? 'bg-white text-rose-950 border-white shadow-md'
                  : 'bg-rose-950/80 text-rose-100 hover:bg-rose-900 border-rose-500/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('tabGrowth', 'WHO Growth & Nutrition')}</span>
            </button>
          </div>
        </div>

        {/* Decorative background rings — subtle, like the Epidemic Radar */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border-4 border-rose-500/20 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-56 h-56 rounded-full border-2 border-rose-500/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-rose-500/40"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/15 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Registered Mothers (ANC)"
          value={totalMothers}
          subtitle="Prenatal tracking active"
          icon={Heart}
          color="rose"
        />
        <StatCard
          title="High-Risk Pregnancy Alerts"
          value={highRiskMothers}
          subtitle="Specialist doctor monitoring"
          icon={HeartHandshake}
          color="amber"
        />
        <StatCard
          title="Immunized Children (UIP)"
          value={totalChildren}
          subtitle="Universal vaccination cards"
          icon={Baby}
          color="sky"
        />
        <StatCard
          title="Overdue Vaccine Alerts"
          value={overdueVaccinesCount}
          subtitle="Immediate reminder needed"
          icon={ShieldCheck}
          color={overdueVaccinesCount > 0 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'mothers' && (
        <PregnancyTracker
          onOpenReminder={(mother) => setActiveReminderModal(mother)}
        />
      )}

      {activeSubTab === 'children' && (
        <ChildVaccineScheduler
          onOpenReminder={(child) => setActiveReminderModal(child)}
        />
      )}

      {activeSubTab === 'growth' && <GrowthMonitor />}

      {/* Reminder Simulator Modal */}
      {activeReminderModal && (
        <ReminderSimulatorModal
          recipient={activeReminderModal}
          isOpen={Boolean(activeReminderModal)}
          onClose={() => setActiveReminderModal(null)}
        />
      )}
    </div>
  );
};
