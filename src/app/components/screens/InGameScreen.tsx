import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

export default function InGameScreen() {
  const { state, deployDefenseUnit, processTurnSequence, startNewGame } = useGame();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const isGameOver = state.gameStatus !== 'IN_PROGRESS';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col gap-6 font-mono select-none">
      
      {/* HUD DASHBOARD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-4 rounded-xl gap-4 shadow-xl">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-wider text-red-500">CATCH ME IF YOU CAN</h1>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest">Immunological Strategic Defense Console</div>
        </div>
        <div className="flex flex-wrap gap-6 text-xs border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-8">
          <div>ROUND: <span className="text-blue-400 font-bold">{state.roundNumber}</span></div>
          <div>EP BIO-RESOURCE: <span className="text-emerald-400 font-bold">{state.playerEp} Units</span></div>
          <div>INFECTED ORGANS: <span className="text-orange-400 font-bold">{state.infectionRate} Sectors</span></div>
          <div>DIFFICULTY: <span className="text-purple-400 font-bold uppercase">{state.difficulty}</span></div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="h-8 text-xs text-slate-400" onClick={() => startNewGame('Casual')}>Casual</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs text-slate-400" onClick={() => startNewGame('Epidemic')}>Epidemic</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs text-slate-400" onClick={() => startNewGame('Pandemic')}>Pandemic</Button>
        </div>
      </div>

      {/* WORKSPACE SECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* INTERACTIVE ORGAN GRAPH LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Anatomical System Layout Graph</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(state.organGraph.zones).map(([key, zone]) => {
              const isTargetedByAI = state.minimaxRecommendedTarget === key;
              return (
                <Card 
                  key={key}
                  onClick={() => !isGameOver && setSelectedZone(key)}
                  className={`transition-all bg-slate-900/40 border-2 text-white hover:border-slate-500 cursor-pointer ${
                    selectedZone === key ? 'border-amber-500 shadow-amber-950/40 shadow-xl' : zone.isInfected ? 'border-red-700 shadow-red-950/20 shadow-lg' : 'border-slate-800'
                  }`}
                >
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-md font-bold tracking-wide">{zone.name}</CardTitle>
                    <div className="flex gap-2">
                      {isTargetedByAI && <Badge className="bg-amber-700 text-[9px] rounded font-bold h-5 px-1.5">AI TRACKING</Badge>}
                      <Badge variant={zone.isInfected ? 'destructive' : 'secondary'} className="text-[10px] rounded h-5 px-1.5">
                        {zone.isInfected ? 'INFECTED' : 'CLEARED'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-xs text-slate-400 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>Defense Capacity:</span>
                      <span className="text-blue-400 font-bold">{zone.activeDefenseCount} / 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resource Yield:</span>
                      <span className="text-emerald-500">+{zone.epGeneration} EP / Turn</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR TRACKERS */}
        <div className="space-y-6 flex flex-col">
          {/* SEVERITY METER */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="p-4 pb-2"><CardTitle className="text-xs font-bold uppercase text-slate-400 tracking-wider">Systemic Failure Saturation</CardTitle></CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <Progress value={state.severityIndex} className="h-2 bg-slate-950" />
              <div className="text-right text-xs font-bold text-red-400">{state.severityIndex} % Critical</div>
            </CardContent>
          </Card>

          {/* PLAYER IMMUNE INTERFACE CONTROL PANEL */}
          <Card className="bg-slate-900 border-slate-800 text-white flex-1 flex flex-col justify-between">
            <CardHeader className="p-4"><CardTitle className="text-xs font-bold uppercase text-slate-400 tracking-wider">Immune Action Resolver</CardTitle></CardHeader>
            <CardContent className="p-4 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center text-xs">
                {selectedZone ? (
                  <div>Target Vector Locked: <span className="text-amber-400 font-bold">{selectedZone}</span></div>
                ) : (
                  <div className="text-slate-500">Awaiting grid zone selection parameter...</div>
                )}
              </div>

              <div className="space-y-2">
                <Button 
                  disabled={!selectedZone || isGameOver}
                  onClick={() => selectedZone && deployDefenseUnit(selectedZone, 'WhiteBloodCells', 10)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-xs font-bold h-10 border border-blue-500 rounded"
                >
                  Deploy WBC Interceptor (10 EP)
                </Button>
                <Button 
                  disabled={!selectedZone || isGameOver}
                  onClick={() => selectedZone && deployDefenseUnit(selectedZone, 'Antibodies', 15)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-xs font-bold h-10 border border-purple-500 rounded"
                >
                  Synthesize Antibodies (15 EP)
                </Button>
                <Button 
                  onClick={processTurnSequence}
                  disabled={isGameOver}
                  className="w-full bg-amber-600 hover:bg-amber-700 font-bold text-xs mt-4 text-white uppercase tracking-widest h-11 border border-amber-500 rounded shadow-xl"
                >
                  {isGameOver ? 'Simulation Concluded' : 'Process Turn & Advance Simulation'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IMMERSIVE TELEMETRY FEED ACCORDION WINDOW */}
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-widest pl-1">Clinical Telemetry Readout Logs</div>
            <div className="flex-1 min-h-[250px] bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 space-y-1.5 shadow-inner">
              {state.logFeed.slice().reverse().map((log, index) => {
                let colorClass = "text-slate-400";
                if (log.startsWith('📋') || log.startsWith('🚨')) colorClass = "text-amber-400 font-bold text-xs border-b border-slate-800 pb-1 mt-2 block";
                else if (log.startsWith('====')) colorClass = "text-slate-700 font-bold block";
                else if (log.startsWith('[BREACH]') || log.startsWith('[CRITICAL]')) colorClass = "text-red-400 font-semibold";
                else if (log.startsWith(' -> [Lungs]') || log.startsWith(' -> [Brain]') || log.startsWith(' -> [Heart]') || log.startsWith(' -> [Gut]') || log.startsWith(' -> [Bloodstream]') || log.startsWith(' -> [Lymph Nodes]')) colorClass = "text-slate-300 pl-4 block italic";
                else if (log.startsWith('[GENETIC ALTERATION]') || log.startsWith(' -> Effect Profile:')) colorClass = "text-purple-400 font-medium";
                else if (log.startsWith('✓') || log.startsWith('[PLAYER ACTION]')) colorClass = "text-emerald-400";
                
                return (
                  <div key={index} className={colorClass}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}