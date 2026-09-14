// The four project pages, in the same order as the carousel toasts
// (egg, avocado, banana, blueberry). Clicking a toast in Projects opens the
// matching entry; the page then links to the others. Edit text / names freely.
import Toast1 from '../../assets/egg-toast.png';
import Toast2 from '../../assets/avocado-toast.png';
import Toast3 from '../../assets/banana-toast.png';
import Toast4 from '../../assets/blueberry-toast.png';
import Text1 from '../../assets/egg-text.png';
import Text2 from '../../assets/avocado-text.png';
import Text3 from '../../assets/banana-text.png';
import Text4 from '../../assets/blueberry-text.png';
import Raccoon from '../../assets/raccoon.svg';
import CompAnalysis from '../../assets/compAnalysis.svg';
// import DesignAesthetics from '../../assets/designAesthetics.svg';
import StatsNoMeals from '../../assets/stats-noMeals.svg';
import StatsMealsSaved from '../../assets/stats-mealsSaved.svg';
import FinalDeliveryPage from '../../assets/finalDeliveryPage.svg';
import FinalBrowsePage from '../../assets/finalBrowsePage.svg';
import Croissant from '../../assets/croissant.svg';
import Homepage from '../../assets/homepage.svg';
import RaccoonFindsVideo from '../../assets/raccoonFinds.mp4';
import RaccoonSketch1 from '../../assets/raccoonSketch1.png';
import RaccoonSketch2 from '../../assets/raccoonSketch2.png';
import GestaltMain from '../../assets/gestaltMain.svg';
import FourGestalt from '../../assets/4gestalt.svg';
// import Code from '../../assets/code.svg';
import Home1 from '../../assets/home1.svg';
import Home2 from '../../assets/home2.svg';
import Date1 from '../../assets/date1.svg';
import Date2 from '../../assets/date2.svg';
import WitchsWorkplace from '../../assets/witchsWorkplace.svg';
import InitialSketches from '../../assets/initialSketches.svg';
import Sketches2 from '../../assets/sketches2.svg';
import Cottage from '../../assets/cottage.svg';
import Workplace from '../../assets/workplace.svg';
import BookSketch1 from '../../assets/bookSketch1.png';
import BookSketch2 from '../../assets/bookSketch2.png';
import BookSketch3 from '../../assets/bookSketch3.png';
import BookSketch4 from '../../assets/bookSKetch4.png';

export const PROJECTS = [
    {
        name: 'RacoonFinds',
        navLabel: 'RaccoonFinds',
        tagline: 'Surplus-food delivery app',
        tools: 'Figma · FigJam · UX Research',
        description:
            'Conducted user research and designed RacoonFinds, a surplus-food delivery app. Also designed the mascot.',
        toast: Toast1,
        text: Text1,
        accent: '#852736',
        role: 'Researcher & Designer',
        year: '2024',
        programs: 'Group Project (5 members)',
        time: 'One semester, ~9 weeks',
        why: 'The project was done for my Human-Computer Interaction class. My team and I wanted to make an app that helps students and solves two issues: the rising prices of good food and the waste of it at restaurants and bakeries. The final idea was to make an app that can be used to order surplus food left over at the end of the day.',
        step1: 'Research',
        step1Detail:
            'We started by looking at existing food-rescue and surplus food apps to see what worked and what didn\'t. Then we ran interviews with actual students to find out what they did and didn\'t like about the concept, what features they would use and what information was important to them. We made all our decisions forwards based on that research.',
        step2: 'Branding',
        step2Detail:
            'The next step was to figure out the apps branding, so we looked through  different visual directions to find an aesthetic that felt approachable and fun. The tone we landed on was warm and inviting.',
        step3: 'App design',
        step3Detail:
            'We mapped out the user flow and designed every screen of the app in Figma. It was made into an interactive prototype so it could be tested and demoed.',
        step4: 'Mascot',
        step4Detail:
            'Even after the app design, something was still missing. In order to give it some personality, I suggested we gamify it and create a mascot. I made a raccoon character in Figma and also added small game-like elements to the app.',
        results:
            'This was my first time going through the full design process and creating a design based on actual research and data. The project taught me about everything that actually goes into designing an app that goes beyond simply how it looks, I learned how to make a reliable and intuitive user flow.',
        mainImage: Raccoon,
        gallery: [
            [CompAnalysis],
            [RaccoonSketch1, RaccoonSketch2],
            [Homepage, Croissant, FinalBrowsePage],
            [FinalDeliveryPage, StatsNoMeals, StatsMealsSaved],
        ],
        video: RaccoonFindsVideo,
    },
    {
        name: 'Gestalt Principles',
        navLabel: 'Thesis Project',
        tagline: 'Interface-design experiment',
        tools: 'HTML · CSS · JavaScript · React · Python',
        description:
            'Conducted experiments to find out the impact of Gestalt principles on interface design. Made two versions of the same website for the experiments.',
        toast: Toast2,
        text: Text2,
        accent: '#AA74A0',
        role: 'Researcher, Designer, Experiment Lead',
        year: '2026',
        programs: 'Solo project',
        time: 'One semester, ~9 weeks',
        why: 'For my thesis, I wanted to work on something that actually excited me, so I decided to combine my major and minor. I wanted to find whether Gestalt principles, psychological rules that explain how our brain processes visual information, affect user experience when they\'re applied to interfaces, or does it not make any difference at all.',
        step1: 'Research',
        step1Detail:
            'I dug into the literature on Gestalt psychology and its application in UX/UI design, and narrowed it down to four principles most commonly used and most easily applied to interfaces: Proximity, Similariy, Prägnanz and Common Region. To test them, I designed an experiment that used two versions of the same flight booking website - one applying these principles and one deliberately violating them',
        step2: 'Designing and building the prototypes',
        step2Detail:
            'Designing the interfaces was the hardest part to get right. Both versions had to be functionally the same, but visually distinct. The "bad" version couldn\'t look obviously bad, otherwise participants would be reacting to poor design and not the absence of Gestalt principles. I built in real mistakes that designers and developers make, then coded both versions as fully working websites. I implemented an eye-tracking system running from the moment participants landed on the page, and timers logging how long each task took.',
        step3: 'Experiment',
        step3Detail:
            'Twenty participants tested both versions in a university lab. They were split into two groups to counterbalance order: one group saw the "good" version first, the other saw the "bad" version first. Every session logged timestamps to an Excel spreadsheet and eye-tracking data to JSON.',
        step4: 'Analysis',
        step4Detail:
            'To process the eye-tracking and timing data, I had to learn and read about the standards psychology uses for this kind of analysis (I-DT alogrithm), then writing Python scripts to run it.',
        results:
            'In the end, my hypothesis held up even with a small sample of participants. They completed tasks 87.6 seconds faster on average using the version built around Gestalt principles, and consistently said that they preffered it. Beyond the results, the project taught me what it actually takes to run a full experiment by yourself, designing based on a set of rules, and then designing against them.',
        mainImage: GestaltMain,
        gallery: [
            [FourGestalt],
            [Home1, Home2],
            [Date1, Date2],
        ],
    },
    {
        name: 'A Witch\'s Workplace',
        navLabel: '2D Game',
        tagline: '2D hand-drawn puzzle game',
        tools: 'Godot · GDScript · Procreate',
        description: 'Designed and built a 2D puzzle game with hand-drawn illustrations.',
        // toast: Toast3,
        // text: Text3,
        accent: '#9792CB',
        role: 'Designer & Coder',
        year: '2026',
        programs: 'Personal Project',
        time: 'Two months',
        why: 'I wanted to try my hand at making a game and add something different to my portfolio. I enjoy calkming puzzle games, so I decided to make my own rather than just play them.',
        step1: 'Concept',
        step1Detail:
            'My biggest inspiration was "A Little to the Left", which I played a lot throughout university. I wanted to make every asset and illustration myself, and I already had some original characters from other work, so I picked one to be the game\'s protagonist and built the concept out from her. I went for a soft, cottagecore aesthetic: a witch living in a cottage in the woods, except her cottage is a mess, and the player helps her tidy it up by sorting different elements into the right order.',
        step2: 'Building it',
        step2Detail:
            'I hand-drew every asset, animated multiple frames of the character moving, and put together a short intro. For the paper elements, I scanned actual crumpled paper myself, to make it look as realistic as possible. For the levels I designed the puzzle logic by figuring out what made a satisfying sorting solution. ',
        step3: 'Experiment',
        step3Detail:
            'Twenty participants tested both versions in a university lab. They were split into two groups to counterbalance order: one group saw the "good" version first, the other saw the "bad" version first. Every session logged timestamps to an Excel spreadsheet and eye-tracking data to JSON.',
        step4: 'Analysis',
        step4Detail:
            'To process the eye-tracking and timing data, I had to learn and read about the standards psychology uses for this kind of analysis (I-DT alogrithm), then writing Python scripts to run it.',
        results:
            'The game is done and fully playable. Working on it brought me back into Godot and forced me to think through the smallest details: difficulty of the levels, mechanics, hints, visual details. ',
        mainImage: WitchsWorkplace,
        gallery: [
            [InitialSketches, Sketches2],
            [Cottage],
            [Workplace],
        ],
    },
    {
        name: 'Book Tracker',
        navLabel: 'Book Tracking App',
        tagline: 'Reading-tracker app design',
        tools: 'Figma · HTML · CSS · JavaScript · React',
        description: 'Plan to make a book review app.',
        toast: Toast4,
        text: Text4,
        accent: '#414B9E',
        why: 'I\'m not the type of reader to read a book and move on. I love writing reviews, writing down my favourite quotes and ranting about the characters. I\'ve tried a handful of reviewing apps, but none of them did exactly what I want. So, since I cannot find something I want, I decided to try and make it.',
        step1: 'Development',
        step1Detail: 'I plan on starting in Figma and make a detailed design of what I want the app to look like and how I want it to behave. From there, I\'ll build the full app with a proper backend and database, so users can create accounts and keep their data. I also want to connect it to an online library API so finding the books, authors, and details can be done automatically, instead of by hand.',
        step2: 'Reviews',
        step2Detail: 'The part I\'m most excited about is the review section. Every book requires a different review, so not all review pages can be the same which is why I want to make them customizable. Each page will have the basic information (title, author, genre, star rating, general review) and from there users can build out the rest of it however they want. They can add a quotes section, favourite character, a rant section, likes and dislikes, start and finish date, or a custom section for whatever doesn\'t fit anywhere else. The review page should adapt to the book, instead of the other way around.',
        step3: 'Additional features',
        step3Detail: 'I also want to add reading statistics and a personal library, where users can see everything they\'ve read and decorate it however they want to.',
        gallery: [
            [BookSketch1, BookSketch2],
            [BookSketch3, BookSketch4],
        ],
    },
];
