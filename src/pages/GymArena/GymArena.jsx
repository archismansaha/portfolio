import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../../components/common/Avatar';

const GymArena = ({ onPageLoad }) => {
  const [currentStats, setCurrentStats] = useState({
    strength: 0,
    endurance: 0,
    consistency: 0
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAvatar, setShowAvatar] = useState(true);

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    
    // Animate progress bars
    setTimeout(() => {
      setCurrentStats({
        strength: 85,
        endurance: 78,
        consistency: 92
      });
    }, 1000);
  }, [onPageLoad]);

  const workoutData = [
    {
      day: 'Monday',
      date: 'Aug 5',
      completed: true,
      type: 'Push Day',
      exercises: [
        { name: 'Bench Press', sets: '4x8', weight: '80kg', completed: true },
        { name: 'Overhead Press', sets: '3x10', weight: '45kg', completed: true },
        { name: 'Dips', sets: '3x12', weight: 'Bodyweight', completed: true }
      ],
      duration: '75 mins',
      calories: 420,
      icon: '💪',
      bgGradient: 'from-primary to-highlight',
      borderColor: 'border-primary'
    },
    {
      day: 'Tuesday', 
      date: 'Aug 6',
      completed: true,
      type: 'Pull Day',
      exercises: [
        { name: 'Deadlifts', sets: '4x6', weight: '120kg', completed: true },
        { name: 'Pull-ups', sets: '3x8', weight: 'Bodyweight+10kg', completed: true },
        { name: 'Barbell Rows', sets: '4x10', weight: '70kg', completed: true }
      ],
      duration: '80 mins',
      calories: 450,
      icon: '🏋️',
      bgGradient: 'from-highlight to-accent',
      borderColor: 'border-highlight'
    },
    {
      day: 'Wednesday',
      date: 'Aug 7', 
      completed: true,
      type: 'Cardio + Core',
      exercises: [
        { name: 'Treadmill Run', sets: '30 mins', weight: '8 km/h', completed: true },
        { name: 'Planks', sets: '3x60s', weight: 'Bodyweight', completed: true },
        { name: 'Russian Twists', sets: '3x20', weight: '10kg plate', completed: true }
      ],
      duration: '60 mins',
      calories: 380,
      icon: '🏃',
      bgGradient: 'from-accent to-primary',
      borderColor: 'border-accent'
    },
    {
      day: 'Thursday',
      date: 'Aug 8',
      completed: false,
      type: 'Rest Day',
      exercises: [],
      duration: '0 mins',
      calories: 0,
      icon: '😴',
      bgGradient: 'from-subtleGray to-dark',
      borderColor: 'border-subtleGray',
      restNote: "Active recovery - coding and stretching"
    },
    {
      day: 'Friday',
      date: 'Aug 9',
      completed: true,
      type: 'Leg Day',
      exercises: [
        { name: 'Squats', sets: '4x8', weight: '100kg', completed: true },
        { name: 'Romanian Deadlifts', sets: '3x10', weight: '80kg', completed: true },
        { name: 'Walking Lunges', sets: '3x12 each', weight: '20kg dumbbells', completed: true }
      ],
      duration: '85 mins',
      calories: 480,
      icon: '🦵',
      bgGradient: 'from-primary to-accent',
      borderColor: 'border-primary'
    }
  ];

  const flirtyQuotes = [
    "You've got gains in code *and* in curls 🏋️‍♂️",
    "Swipe right on squats 😉",
    "Your deadlift form is as clean as your code! 💪",
    "Benchpress your way into my heart? 👀💕"
  ];

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Gym Arena</h1>
          <p className="text-center text-softText/80 text-lg mb-12 max-w-2xl mx-auto">
            Where code meets iron. Building muscles and debugging life, one rep at a time.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Strength Progress */}
          <div className="soft-card border-2 border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-heading font-bold text-accent flex items-center">
                🏋️ Strength
              </h3>
              <span className="text-2xl font-bold text-accent">{currentStats.strength}%</span>
            </div>
            <div className="progress-bar mb-4">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${currentStats.strength}%` }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-softText/80 text-sm">
              Bench: 80kg • Deadlift: 120kg • Squat: 100kg
            </p>
            <p className="flirt-text text-sm mt-2">
              "Your programming muscles are looking swole today! 🔥"
            </p>
          </div>

          {/* Endurance Progress */}
          <div className="soft-card border-2 border-highlight/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-heading font-bold text-highlight flex items-center">
                🏃 Endurance
              </h3>
              <span className="text-2xl font-bold text-accent">{currentStats.endurance}%</span>
            </div>
            <div className="progress-bar mb-4">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${currentStats.endurance}%` }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-softText/80 text-sm">
              5K run: 25 mins • Max heart rate zones achieved
            </p>
            <p className="flirt-text text-sm mt-2">
              "Netflix and chill? Nah, deadlifts and skill 😏"
            </p>
          </div>

          {/* Consistency Progress */}
          <div className="soft-card border-2 border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-heading font-bold text-accent flex items-center">
                📊 Consistency
              </h3>
              <span className="text-2xl font-bold text-accent">{currentStats.consistency}%</span>
            </div>
            <div className="progress-bar mb-4">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${currentStats.consistency}%` }}
                transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-softText/80 text-sm">
              23/25 workouts this month • 5 day streak
            </p>
            <p className="flirt-text text-sm mt-2">
              "Your consistency in gym = your consistency in love? 👀💘"
            </p>
          </div>
        </motion.div>

        {/* Weekly Workout Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-heading font-bold text-highlight mb-8 text-center">
            This Week's Battle Log
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutData.map((workout, index) => (
              <motion.div
                key={workout.day}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="card-interactive relative"
                onClick={() => setSelectedDay(workout)}
              >
                {/* Completion Badge */}
                <div className="absolute top-4 right-4">
                  {workout.completed ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm shadow-glow"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 bg-subtleGray rounded-full flex items-center justify-center text-softText/50 text-sm">
                      ⏸️
                    </div>
                  )}
                </div>

                {/* Day Info */}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3 float-animation">{workout.icon}</div>
                  <h3 className="text-xl font-heading font-bold text-accent">{workout.day}</h3>
                  <p className="text-softText/70 text-sm">{workout.date}</p>
                </div>

                {/* Workout Type */}
                <div className="bg-dark/50 rounded-lg p-3 mb-4 border border-primary/20">
                  <h4 className="text-accent font-bold text-sm text-center">
                    {workout.type}
                  </h4>
                </div>

                {/* Stats */}
                {workout.completed && workout.exercises.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-softText/70">Duration</p>
                      <p className="text-softText font-bold">{workout.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-softText/70">Calories</p>
                      <p className="text-accent font-bold">{workout.calories}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="text-softText/70">Exercises</p>
                      <p className="text-highlight font-bold">{workout.exercises.length}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-softText/70 text-sm italic">
                      {workout.restNote || "Rest day"}
                    </p>
                  </div>
                )}

                {/* Click hint */}
                <div className="absolute bottom-2 left-2 right-2 text-center text-softText/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for details →
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Workout Modal */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-subtleGray rounded-2xl border-2 border-primary shadow-glow-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{selectedDay.icon}</div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-accent">
                          {selectedDay.day} - {selectedDay.type}
                        </h2>
                        <p className="text-softText/70">{selectedDay.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="text-softText/70 hover:text-softText text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Workout Details */}
                  {selectedDay.exercises.length > 0 ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center bg-dark/50 rounded-lg p-3 border border-primary/20">
                          <p className="text-softText/70 text-sm">Duration</p>
                          <p className="text-accent font-bold text-lg">{selectedDay.duration}</p>
                        </div>
                        <div className="text-center bg-dark/50 rounded-lg p-3 border border-highlight/20">
                          <p className="text-softText/70 text-sm">Calories</p>
                          <p className="text-accent font-bold text-lg">{selectedDay.calories}</p>
                        </div>
                        <div className="text-center bg-dark/50 rounded-lg p-3 border border-accent/20">
                          <p className="text-softText/70 text-sm">Exercises</p>
                          <p className="text-highlight font-bold text-lg">{selectedDay.exercises.length}</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-highlight mb-4">Exercise Log:</h3>
                      <div className="space-y-3">
                        {selectedDay.exercises.map((exercise, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-dark/50 rounded-lg p-4 border-l-4 ${
                              exercise.completed ? 'border-accent' : 'border-subtleGray'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-softText font-bold">{exercise.name}</h4>
                                <p className="text-softText/70 text-sm">
                                  {exercise.sets} @ {exercise.weight}
                                </p>
                              </div>
                              <div className="text-xl">
                                {exercise.completed ? '✅' : '❌'}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">{selectedDay.icon}</div>
                      <h3 className="text-xl font-heading font-bold text-accent mb-2">Rest Day</h3>
                      <p className="text-softText/70">
                        {selectedDay.restNote || "Recovery is as important as training!"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar with Flirty Gym Quotes */}
      {showAvatar && (
        <Avatar
          currentLevel={22}
          currentXP={2200}
          visitedPages={['gym']}
          mood="flirty"
          messages={flirtyQuotes}
        />
      )}
    </div>
  );
};

export default GymArena;
