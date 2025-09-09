import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, ChevronDown, ChevronUp, Award, Mic, MicOff, Star, Trophy, Gift, Lock, Unlock, Lightbulb, Calculator } from 'lucide-react';

const CountdownTimer = () => {
  // Basic timer states
  const [timeLeft, setTimeLeft] = useState(300);
  const [originalTime, setOriginalTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pinata');
  const [theme, setTheme] = useState('light');
  const [isMuted, setIsMuted] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(5);
  const [customSeconds, setCustomSeconds] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [currentSurprise, setCurrentSurprise] = useState(0);
  const [alarmTone, setAlarmTone] = useState('party');
  const [completedTimers, setCompletedTimers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tapEffects, setTapEffects] = useState([]);
  const [crackLevel, setCrackLevel] = useState(0);
  
  // Enhanced interactivity states
  const [isListening, setIsListening] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [backgroundEffects, setBackgroundEffects] = useState([]);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [touchPoints, setTouchPoints] = useState([]);
  
  // Gamification states
  const [playerLevel, setPlayerLevel] = useState(1);
  const [xpPoints, setXpPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [timerStreak, setTimerStreak] = useState(0);
  const [collections, setCollections] = useState({
    pinatas: ['classic'],
    eggs: ['basic'],
    characters: [],
    stickers: []
  });
  const [showRewards, setShowRewards] = useState(false);
  const [currentMiniGame, setCurrentMiniGame] = useState(null);
  const [funFact, setFunFact] = useState(null);
  
  // Customization states
  const [selectedCharacter, setSelectedCharacter] = useState('robot');
  const [backgroundPattern, setBackgroundPattern] = useState('gradient');
  const [fontStyle, setFontStyle] = useState('comic');
  const [soundPack, setSoundPack] = useState('party');
  
  // Parental controls
  const [isLocked, setIsLocked] = useState(false);
  const [parentCode, setParentCode] = useState('1234');
  const [showParentPanel, setShowParentPanel] = useState(false);
  
  // Educational features
  const [educationalMode, setEducationalMode] = useState(false);
  const [mathMode, setMathMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const recognitionRef = useRef(null);

  // Data arrays
  const presetTimes = [
    { label: '1 min', seconds: 60 },
    { label: '3 min', seconds: 180 },
    { label: '5 min', seconds: 300 }
  ];

  const themes = [
    { name: 'light', label: '☀️ Light', bg: 'from-pink-200 via-purple-200 to-blue-200' },
    { name: 'dark', label: '🌙 Dark', bg: 'from-purple-900 via-blue-900 to-indigo-900' },
    { name: 'rainbow', label: '🌈 Rainbow', bg: 'from-red-300 via-yellow-300 via-green-300 via-blue-300 to-purple-300' },
    { name: 'stars', label: '⭐ Stars', bg: 'from-indigo-900 via-purple-900 to-black' },
    { name: 'ocean', label: '🌊 Ocean', bg: 'from-blue-400 via-cyan-300 to-teal-200' }
  ];

  const alarmTones = [
    { name: 'party', label: '🎺 Party Horn', frequencies: [800, 1000, 1200] },
    { name: 'drumroll', label: '🥁 Drumroll', frequencies: [400] },
    { name: 'animal', label: '🐸 Animal Sound', frequencies: [600, 400, 600, 800] },
    { name: 'laughter', label: '😂 Kids Laughter', frequencies: [700, 900, 600] },
    { name: 'space', label: '🚀 Space Sound', frequencies: [300, 500, 700, 900] }
  ];

  const characters = [
    { id: 'robot', name: '🤖 Robot', unlockLevel: 1 },
    { id: 'dinosaur', name: '🦖 T-Rex', unlockLevel: 3 },
    { id: 'fairy', name: '🧚 Fairy', unlockLevel: 5 },
    { id: 'dragon', name: '🐉 Dragon', unlockLevel: 8 },
    { id: 'unicorn', name: '🦄 Unicorn', unlockLevel: 10 }
  ];

  const badgeDefinitions = [
    { id: 'first_timer', name: 'First Timer!', emoji: '🎯', condition: (stats) => stats.completed >= 1 },
    { id: 'speed_demon', name: 'Speed Demon', emoji: '⚡', condition: (stats) => stats.fastTimers >= 3 },
    { id: 'patient_pro', name: 'Patient Pro', emoji: '🧘', condition: (stats) => stats.longTimers >= 5 },
    { id: 'streak_master', name: 'Streak Master', emoji: '🔥', condition: (stats) => stats.maxStreak >= 5 },
    { id: 'math_genius', name: 'Math Genius', emoji: '🧮', condition: (stats) => stats.mathCorrect >= 10 },
    { id: 'collector', name: 'Collector', emoji: '🏆', condition: (stats) => stats.collections >= 5 }
  ];

  const funFacts = [
    "🦕 Dinosaurs lived millions of years ago and came in all sizes!",
    "🐢 Some turtles can live over 200 years - that's super old!",
    "🐣 Baby chickens are called chicks and can walk right after hatching!",
    "🦎 Axolotls can regrow their arms and legs if they lose them!",
    "🐦 Birds are the only animals with feathers in the whole world!",
    "🌟 There are more stars in the sky than grains of sand on all beaches!",
    "🦋 Butterflies taste with their feet - isn't that weird?",
    "🐳 Blue whales are the largest animals that ever lived on Earth!"
  ];

  const mathQuestions = [
    { question: "What is 3 + 2?", answer: 5, options: [4, 5, 6] },
    { question: "What is 7 - 3?", answer: 4, options: [3, 4, 5] },
    { question: "What is 2 × 4?", answer: 8, options: [6, 8, 10] },
    { question: "What is 6 + 4?", answer: 10, options: [9, 10, 11] },
    { question: "What is 9 - 5?", answer: 4, options: [3, 4, 5] },
    { question: "What is 3 × 3?", answer: 9, options: [8, 9, 10] }
  ];

  const pinataSurprises = [
    { name: 'bubbles', icon: '🫧', animation: 'float-up', color: 'text-blue-400', sound: [800, 900] },
    { name: 'ball', icon: '⚽', animation: 'bounce-across', color: 'text-orange-500', sound: [600, 700] },
    { name: 'strings', icon: '🎊', animation: 'fly-around', color: 'text-pink-500', sound: [900, 1000] },
    { name: 'slime', icon: '💚', animation: 'splat', color: 'text-green-500', sound: [400, 500] },
    { name: 'robot', icon: '🤖', animation: 'dance', color: 'text-purple-500', sound: [700, 800, 900] }
  ];

  const eggSurprises = [
    { name: 'dinosaur', icon: '🦕', animation: 'hatch', color: 'text-green-600', sound: [300, 400, 300] },
    { name: 'chicken', icon: '🐥', animation: 'peck', color: 'text-yellow-500', sound: [800, 700, 800] },
    { name: 'bird', icon: '🐦', animation: 'fly', color: 'text-blue-500', sound: [900, 1100, 900] },
    { name: 'axolotl', icon: '🌸', animation: 'swim', color: 'text-pink-400', sound: [600, 500, 600] },
    { name: 'turtle', icon: '🐢', animation: 'crawl', color: 'text-green-500', sound: [400, 300, 400] }
  ];

  const currentSurprises = mode === 'pinata' ? pinataSurprises : eggSurprises;

  // Utility functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTheme = () => {
    const selectedTheme = themes.find(t => t.name === theme) || themes[0];
    return selectedTheme;
  };

  const handleStart = () => {
    if (isLocked) return;
    setIsRunning(true);
  };
  
  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    if (isLocked) return;
    setIsRunning(false);
    setTimeLeft(originalTime);
    setCurrentSurprise(0);
    setCrackLevel(0);
    setTapEffects([]);
    setShakeIntensity(0);
    setTouchPoints([]);
    setCurrentQuestion(null);
    setFunFact(null);
  };

  const handlePresetTime = (seconds) => {
    if (isLocked) return;
    setTimeLeft(seconds);
    setOriginalTime(seconds);
    setIsRunning(false);
    setCurrentSurprise(0);
    setCrackLevel(0);
    setTapEffects([]);
    setShakeIntensity(0);
    setTouchPoints([]);
  };

  const handleCustomTime = () => {
    if (isLocked) return;
    const totalSeconds = customMinutes * 60 + customSeconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setOriginalTime(totalSeconds);
      setIsRunning(false);
      setCurrentSurprise(0);
      setCrackLevel(0);
      setTapEffects([]);
      setShakeIntensity(0);
      setTouchPoints([]);
    }
  };

  const handleTap = (e) => {
    if (!isRunning || isLocked) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const effectsToAdd = [];
    for (let i = 0; i < 3; i++) {
      effectsToAdd.push({
        id: Date.now() + i,
        x: x - 20 + (Math.random() - 0.5) * 40,
        y: y - 20 + (Math.random() - 0.5) * 40,
        emoji: mode === 'pinata' ? ['✨', '⭐', '💥', '🎊'][Math.floor(Math.random() * 4)] : ['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)],
        scale: 0.8 + Math.random() * 0.4
      });
    }
    
    setTapEffects(prev => [...prev, ...effectsToAdd]);
    
    effectsToAdd.forEach(effect => {
      setTimeout(() => {
        setTapEffects(prev => prev.filter(e => e.id !== effect.id));
      }, 1200);
    });
  };

  // Timer effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowConfetti(true);
            const newCompleted = completedTimers + 1;
            setCompletedTimers(newCompleted);
            setTimerStreak(prev => prev + 1);
            
            setTimeout(() => setShowConfetti(false), 5000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, completedTimers]);

  // Progress effect
  useEffect(() => {
    const progress = 1 - (timeLeft / originalTime);
    const surpriseIndex = Math.min(
      Math.floor(progress * currentSurprises.length),
      currentSurprises.length - 1
    );
    setCurrentSurprise(surpriseIndex);
    
    if (progress < 0.2) setCrackLevel(0);
    else if (progress < 0.4) setCrackLevel(1);
    else if (progress < 0.6) setCrackLevel(2);
    else if (progress < 0.8) setCrackLevel(3);
    else setCrackLevel(4);
  }, [timeLeft, originalTime, currentSurprises.length]);

  const progress = 1 - (timeLeft / originalTime);

  return (
    <div className={`min-h-screen transition-all duration-500 bg-gradient-to-br ${getCurrentTheme().bg} relative overflow-hidden`}>
      
      {/* Stars pattern overlay for stars theme */}
      {theme === 'stars' && (
        <div className="fixed inset-0 stars-pattern pointer-events-none opacity-30" />
      )}
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Player Stats Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-4 border-yellow-400`}>
          <div className="flex items-center space-x-6">
            {/* Level */}
            <div className="text-center">
              <div className={`text-2xl font-black ${theme === 'dark' ? 'text-yellow-400' : 'text-purple-600'}`}>
                Lv.{playerLevel}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Level
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="flex-1 min-w-32">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>XP</span>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {xpPoints % 100}/100
                </span>
              </div>
              <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${(xpPoints % 100)}%` }}
                />
              </div>
            </div>
            
            {/* Streak */}
            <div className="text-center">
              <div className={`text-2xl font-black ${timerStreak > 0 ? 'text-orange-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                🔥{timerStreak}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Streak
              </div>
            </div>
            
            {/* Completed Timers */}
            <div className="text-center">
              <div className={`text-2xl font-black ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {completedTimers}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Done
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="fixed right-4 top-4 z-40">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border-4 ${theme === 'dark' ? 'border-purple-600' : 'border-yellow-400'}`}>
          <button
            onClick={() => setShowControls(!showControls)}
            className={`w-14 h-14 flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600' : 'bg-yellow-400 hover:bg-yellow-500'
            } text-white transition-colors font-bold text-lg`}
          >
            {showControls ? <ChevronUp size={24} /> : <Settings size={24} />}
          </button>
          
          {showControls && (
            <div className={`p-6 space-y-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} max-h-96 overflow-y-auto`}>
              
              {/* Parental Lock */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  🔒 Parental Lock
                </label>
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold w-full ${
                    isLocked
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                  <span>{isLocked ? 'LOCKED' : 'UNLOCKED'}</span>
                </button>
              </div>

              {/* Theme Selection */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  🎨 Background Themes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTheme(t.name)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                        theme === t.name
                          ? 'bg-blue-500 text-white shadow-lg'
                          : theme === 'dark' 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Educational Features */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  🎓 Learning Mode
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setEducationalMode(!educationalMode)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold w-full ${
                      educationalMode
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Lightbulb size={16} />
                    <span>{educationalMode ? 'Fun Facts ON' : 'Fun Facts OFF'}</span>
                  </button>
                  
                  <button
                    onClick={() => setMathMode(!mathMode)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold w-full ${
                      mathMode
                        ? 'bg-green-500 text-white'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Calculator size={16} />
                    <span>{mathMode ? 'Math Games ON' : 'Math Games OFF'}</span>
                  </button>
                </div>
              </div>

              {/* Sound Control */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  🔊 Sound Control
                </label>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold w-full ${
                    isMuted
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  <span>{isMuted ? 'Sound OFF' : 'Sound ON'}</span>
                </button>
              </div>

              {/* Mode Selection */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  🎮 Fun Modes
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMode('pinata')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      mode === 'pinata'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🪅 Piñata
                  </button>
                  <button
                    onClick={() => setMode('egg')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      mode === 'egg'
                        ? 'bg-green-500 text-white shadow-lg'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🥚 Egg
                  </button>
                </div>
              </div>

              {/* Preset Times */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  ⚡ Quick Times
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {presetTimes.map((preset) => (
                    <button
                      key={preset.seconds}
                      onClick={() => handlePresetTime(preset.seconds)}
                      disabled={isLocked}
                      className={`px-3 py-2 rounded-lg text-sm font-bold ${
                        isLocked 
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : theme === 'dark' 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      } border-2 border-transparent hover:border-blue-400`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Time */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  ⏰ Custom Time
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 0)}
                    disabled={isLocked}
                    className={`w-16 px-3 py-2 text-sm font-bold rounded-lg ${
                      isLocked 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border-2 text-center`}
                    placeholder="MM"
                  />
                  <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={customSeconds}
                    onChange={(e) => setCustomSeconds(parseInt(e.target.value) || 0)}
                    disabled={isLocked}
                    className={`w-16 px-3 py-2 text-sm font-bold rounded-lg ${
                      isLocked 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : theme === 'dark' 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border-2 text-center`}
                    placeholder="SS"
                  />
                  <button
                    onClick={handleCustomTime}
                    disabled={isLocked}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                      isLocked 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    SET
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          {/* Timer Container */}
          <div className={`relative w-96 h-96 mx-auto mb-8 ${shakeIntensity > 0 ? 'shake-effect' : ''}`}>
            {/* Main Shape */}
            <div 
              className={`w-full h-full relative overflow-hidden tap-area ${
                mode === 'pinata' 
                  ? 'bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 rounded-3xl shadow-2xl' 
                  : 'bg-gradient-to-br from-blue-100 via-white to-yellow-100 rounded-full shadow-2xl border-8 border-yellow-300'
              } ${isRunning ? 'animate-pulse' : ''} ${isLocked ? 'cursor-not-allowed opacity-75' : ''}`}
              onClick={handleTap}
              style={{
                backgroundImage: crackLevel > 0 ? `linear-gradient(45deg, transparent 48%, rgba(139, 69, 19, 0.8) 49%, rgba(139, 69, 19, 0.8) 51%, transparent 52%)` : 'none',
                backgroundBlendMode: 'multiply'
              }}
            >
              {/* Timer Display */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className={`text-6xl font-black ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                } drop-shadow-2xl`}
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  textShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                }}>
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Tap Effects */}
              {tapEffects.map((effect) => (
                <div
                  key={effect.id}
                  className="absolute pointer-events-none z-50"
                  style={{
                    left: effect.x,
                    top: effect.y,
                    fontSize: `${2 + (effect.scale || 1)}rem`,
                    animation: 'tapEffect 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                  }}
                >
                  {effect.emoji}
                </div>
              ))}

              {/* Final Explosion Effect */}
              {timeLeft === 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-40">
                  <div className="text-9xl animate-bounce">
                    🎉
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-6xl animate-ping"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-80px)`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      >
                        {mode === 'pinata' ? '🎊' : '🌟'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode Indicator */}
              <div className="absolute top-2 left-2 text-3xl z-10">
                {mode === 'pinata' ? '🪅' : '🥚'}
              </div>
            </div>

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${progress * 283} 283`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Tap Instruction */}
          {isRunning && !isLocked && (
            <div className={`mb-4 text-lg font-bold animate-pulse ${theme === 'dark' ? 'text-yellow-300' : 'text-purple-600'}`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              👆 Tap the {mode === 'pinata' ? 'piñata' : 'egg'} for fun sounds! 
            </div>
          )}

          {/* Lock Instruction */}
          {isLocked && (
            <div className={`mb-4 text-lg font-bold ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              🔒 Timer is locked! Ask a grown-up to unlock it.
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-6">
            <button
              onClick={isRunning ? handlePause : handleStart}
              disabled={timeLeft === 0 || isLocked}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform ${
                timeLeft === 0 || isLocked
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isRunning 
                  ? 'bg-red-500 hover:bg-red-600 hover:scale-110 active:scale-95' 
                  : 'bg-green-500 hover:bg-green-600 hover:scale-110 active:scale-95'
              } font-bold text-2xl`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              {isRunning ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button
              onClick={handleReset}
              disabled={isLocked}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform font-bold text-2xl ${
                isLocked 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 hover:scale-110 active:scale-95'
              }`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <RotateCcw size={28} />
            </button>
          </div>

          {/* Mode Display */}
          <div className={`mt-8 text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            style={{ 
              fontFamily: 'Comic Sans MS, cursive',
              textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
            }}
          >
            {mode === 'pinata' ? '🪅 PIÑATA PARTY MODE! 🪅' : '🥚 SURPRISE EGG ADVENTURE! 🥚'}
          </div>

          {/* Completion Message */}
          {timeLeft === 0 && (
            <div className={`mt-6 text-5xl font-black animate-bounce ${theme === 'dark' ? 'text-yellow-300' : 'text-orange-600'}`}
              style={{ 
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '3px 3px 0px rgba(0,0,0,0.3)'
              }}
            >
              🎉 TIME'S UP! CELEBRATION TIME! 🎉
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
