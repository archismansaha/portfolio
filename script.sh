#!/bin/bash

# Create the main project directory structure
echo "Creating portfolio-rpg folder structure..."

# Create public directories
mkdir -p public/assets/{images/{avatar,anime,backgrounds,icons},audio/{bgm,sfx,voice},fonts}

# Create src directories
mkdir -p src/{components/{common/{Avatar,DialogueBox,Navbar,MusicToggle},ui/{Puzzle/PuzzleTypes,QuestCard,ShaayariScroll,XPProgress},layout},pages/{Home,AboutMe,Experience,Skills,Projects,Shaayari,GymArena,Animeverse,SecretCrush,Contact,InstagramUnlock},hooks,context,utils,data,styles}

# Create component files
echo "Creating component files..."

# Common components
touch src/components/common/Avatar/{Avatar.jsx,Avatar.module.css,index.js}
touch src/components/common/DialogueBox/{DialogueBox.jsx,DialogueBox.module.css,index.js}
touch src/components/common/Navbar/{Navbar.jsx,Navbar.module.css,index.js}
touch src/components/common/MusicToggle/{MusicToggle.jsx,MusicToggle.module.css,index.js}

# UI components
touch src/components/ui/Puzzle/{Puzzle.jsx,Puzzle.module.css,index.js}
touch src/components/ui/Puzzle/PuzzleTypes/{SkillUnlock.jsx,Quiz.jsx}
touch src/components/ui/QuestCard/{QuestCard.jsx,QuestCard.module.css,index.js}
touch src/components/ui/ShaayariScroll/{ShaayariScroll.jsx,ShaayariScroll.module.css,index.js}
touch src/components/ui/XPProgress/{XPProgress.jsx,XPProgress.module.css,index.js}

# Layout
touch src/components/layout/{Layout.jsx,Layout.module.css,index.js}

# Create page files
echo "Creating page files..."
for page in Home AboutMe Experience Skills Projects Shaayari GymArena Animeverse SecretCrush Contact InstagramUnlock; do
    touch src/pages/$page/{$page.jsx,$page.module.css,index.js}
done

# Create hook files
echo "Creating hook files..."
touch src/hooks/{useLocalStorage.js,useGameProgress.js,useXP.js,useAudio.js,useEmailJS.js}

# Create context files
touch src/context/{GameContext.js,AudioContext.js,ThemeContext.js}

# Create utility files
touch src/utils/{gameLogic.js,constants.js,animations.js,storage.js,helpers.js}

# Create data files
touch src/data/{gameData.js,projectsData.js,skillsData.js,experienceData.js,shaayariData.js,dialogues.js}

# Create style files
touch src/styles/{globals.css,animations.css,themes.css,tailwind.css}

# Create main app files
touch src/{App.jsx,App.css,index.js,index.css}

# Create root files
touch public/{index.html,favicon.ico}
touch {.gitignore,package.json,tailwind.config.js,postcss.config.js,README.md}

echo "✅ Portfolio RPG folder structure created successfully!"
echo "📁 Total directories created: $(find . -type d | wc -l)"
echo "📄 Total files created: $(find . -type f | wc -l)"
echo ""
echo "Next steps:"
echo "1. cd into your project directory"
echo "2. Run: npm init -y"
echo "3. Install dependencies: npm install react react-dom framer-motion emailjs-com"
echo "4. Install dev dependencies: npm install -D tailwindcss postcss autoprefixer"
echo "5. Initialize Tailwind: npx tailwindcss init -p"
