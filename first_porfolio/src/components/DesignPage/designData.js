import SipPaint1 from '../../assets/sipPaint1.svg';
import SipPaint2 from '../../assets/sipPaint2.svg';
import SipPaint3 from '../../assets/sipPaint3.svg';
import MidnightBreakfast1 from '../../assets/midnightBreakfast1.svg';
import MidnightBreakfast2 from '../../assets/midnightBreakfast2.svg';
import BalkanNight from '../../assets/balkanNight.svg';
import SipCarve from '../../assets/sipCarve.svg';
import ArtOn from '../../assets/artOn.svg';
import MarshmallowNight from '../../assets/marshmallowNight.svg';
import KeepEyesOnRoad from '../../assets/keepEyesOnRoad.png';
import FB_Bunny from '../../assets/full_body_bunny.svg';
import A_Bunny from '../../assets/action_bunny.svg';
import HS_Bunny from '../../assets/headshots_bunny.svg';
import Shield from '../../assets/shield_bunny.svg';
import FB_Alien from '../../assets/alien_fullBody.svg';
import HS_Alien from '../../assets/alien_headShots.svg';
import Powers_Alien from '../../assets/alien_powers.svg';
import Assets_Alien from '../../assets/alien_assets.svg';
import Outfit_Raccoon from '../../assets/raccoon_outfit.svg';
import FB_Raccoon from '../../assets/raccoon_fullBody.svg';
import HS_Raccoon from '../../assets/raccoon_headShots.svg';
import Sketches_Raccoon from '../../assets/raccoon_sketches.svg';
import HS_Koala from '../../assets/Koala_headShots.svg';
import FB_Koala from '../../assets/Koala_fullBody.svg';
import Sketches_Koala from '../../assets/Koala_sketches.svg';
import Assets_Koala from '../../assets/Koala_assets.svg';
import HS_Deer from '../../assets/Deer_headShots.svg';
import FB_Deer from '../../assets/Deer_fullBody.svg';
import Scary_Deer from '../../assets/Deer_scary.svg';
import Scary2_Deer from '../../assets/Deer_scary2.svg';
import ToteBag1 from '../../assets/toteBag-1.svg';
import Mockup2 from '../../assets/mockup2.svg';
import Design2White from '../../assets/design2-white.svg';
import Mockup3 from '../../assets/mockup3.svg';
import Mockup4 from '../../assets/mockup4.svg';
import Mockup5 from '../../assets/mockup5.svg';
import RabbitIcon from '../../assets/rabbit.svg';
import MoleIcon from '../../assets/mole.svg';
import RaccoonIcon from '../../assets/raccoon-lps.svg';
import KoalaIcon from '../../assets/koala.svg';
import DeerIcon from '../../assets/deer.svg';

export const DESIGNS = [
    {
        name: 'Character Design',
        navLabel: 'Characters',
        tagline: 'Getting inspiration from everywhere',
        description:
            'I draw inspiration for my characters from the most obscure places. '
            + 'For this particular collection, I drew inspiration from my old collection of LPS toys, and I drew them as people in different styles and time periods.',
        accent: '#8CABFF',
        sections: [
            {
                title: 'Roman Warrior',
                species: 'Rabbit',
                speciesIcon: RabbitIcon,
                description:
                    'She is strong and brave, but at the same time she\'s gentle and kind. She\'s an extraordinary strategist and fighter. She is as much feminine as she is masculine. ',
                card: [
                    { label: 'Signature details', value: [
                        'Hairstyle styled to immitate bunny ears',
                        'Flora and fauna on her armour to express her gentleness',
                        'Rabbit engraved on her shield'
                    ] },
                    { label: 'Powers', value: 'Strength, master strategist, very fast runner and hightened senses. She can also make healing ointments from natural ingredients.'},
                    { label: 'Weaknesses', value: 'Gets overwhelmes by loud noise and chaos; too stubborn for her own good.'}
                ],
                cardImage: HS_Bunny,
                gallery: [FB_Bunny, Shield, A_Bunny, HS_Bunny],
                galleryLayout: 'feature',
            },
            {
                title: 'Alien',
                species: 'Mole',
                speciesIcon: MoleIcon,
                description:
                    'Bubbly and optimistic... most of the time. If someone threatens her or her loved ones, the warmth turns into fury, capable of destroying anything in her path. '
                    + 'She always comes in peace and finds humanity\'s depiction of alien spaceships funny.',
                card: [
                    { label: 'Signature details', value: [
                        'Skin colour made the same as the original',
                        'Has moles on her skin in the shape of constellations',
                        'Spaceship-shaped earrings she bought from a trinket store on Earth and refuses to take off',
                    ] },
                    { label: 'Powers', value: 'Draws energy from stars and cosmic elements, which gets absorbed in the constellations on her skin. She channels it as destructive force.' },
                    { label: 'Weaknesses', value: 'Too gullible sometimes; super bright light blind her.' },
                ],
                cardImage: HS_Alien,
                gallery: [FB_Alien, Powers_Alien, Assets_Alien, HS_Alien],
                galleryLayout: 'feature',
            },
            {
                title: 'Viking',
                species: 'Raccoon',
                speciesIcon: RaccoonIcon,
                description: 'He is cold and distant to those he does not know, but protective of the people he loves. He\'s a skilled craftsman who knows how to work with wood and leather, and loves making his own clothing and gear.',
                card: [
                    { label: 'Signature details', value: [
                        'Norse face tattoos to mimic spots around eyes',
                        'Raccoon tail on his belt as a good-luck charm',
                        'Very particular about washing his food and hands',
                    ] },
                    { label: 'Powers', value: 'Pure muscle. But he also makes deals and sacrifices to the Norse gods in exchange for favours.' },
                    { label: 'Weaknesses', value: 'Doesn\'t trust easily and refuses help from strangers even when needed.' },
                ],
                cardImage: HS_Raccoon,
                gallery: [FB_Raccoon, Outfit_Raccoon, Sketches_Raccoon, HS_Raccoon],
                galleryLayout: 'feature',
            },
            {
                title: 'Futuristsm',
                species: 'Koala',
                speciesIcon: KoalaIcon,
                description: 'Her attention span is basically non-existent, but she\'ll fix any faulty tech even if it takes hours. She loves building her own gadgets, gets bored halfway through so she has a bunch of unfinished ones. She\'s rarely seen without her rollerblades, and probably doesn\'t own actual shoes. Other than tech, she is also an amazing artist',
                card: [
                    { label: 'Signature details', value: [
                        'Hair in the form of koala ears',
                        'Stars are her symbols',
                        'Is amazing at makeup',
                    ] },
                    { label: 'Powers', value: 'Can build any gadget or weapon from scratch. Has a lot of hidden gadgets on her person.' },
                    { label: 'Weaknesses', value: 'Burns out fast and needs long time to rest.' },
                ],
                cardImage: HS_Koala,
                gallery: [FB_Koala, HS_Koala, Assets_Koala, Sketches_Koala],
                galleryLayout: 'feature',
            },
            {
                title: 'Slavic Horror',
                species: 'Deer',
                speciesIcon: DeerIcon,
                description: 'She is the typical slavic woman at first glance, until you do something you shouldn\'t. She lives in harmony with nature, loves tending to animals and making homemade jam. But at night she takes on a different form. Parents tell stories about her to scare children, not realizing she\'s real and a guardian of the forest.',
                card: [
                    { label: 'Signature details', value: [
                        'Hair creates a heart shape on her forehead, to mirror the heart element on the original',
                        'Traditional slavic dress and head scarf',
                        'Freckles to mimic deer spots',
                    ] },
                    { label: 'Powers', value: 'She uses the forest as her weapon - traps enemies in tree roots and burries them in the forest soil.' },
                    { label: 'Weaknesses', value: 'Strong wind drafts.' },
                ],
                cardImage: HS_Deer,
                gallery: [FB_Deer, HS_Deer, Scary_Deer, Scary2_Deer],
                galleryLayout: 'feature',
            },
        ],
    },
    {
        name: 'Posters',
        navLabel: 'Posters',
        description:
            'All event posters were done for actual events during my job as an REA. They were all made in Canva.',
        accent: '#AA74A0',
        gallery: [
            SipPaint1,
            SipPaint2,
            SipPaint3,
            MidnightBreakfast1,
            MidnightBreakfast2,
            BalkanNight,
            SipCarve,
            ArtOn,
            MarshmallowNight,
            KeepEyesOnRoad,
        ],
    },
    {
        name: 'Tote Bags',
        navLabel: 'Tote Bags',
        accent: '#852736',
        sections: [
            {
                title: 'Grad Tote Bag Design (2025)',
                task: 'Design a tote bag for the graduating class of 2025.',
                approach:
                    'I wanted a design that captures all the memories we\'d made together at the college, so I built it around a collection of small, personal references only we would recognize. It includes our favourite events, student-made films, awards, and any other element that would remind the students of their time there.',
                program: 'Procreate',
                gallery: [ToteBag1, Mockup2, Mockup3],
            },
            {
                title: 'Grad Tote Bag Design (2026)',
                task: 'Design a second tote bag, this time for the graduating class of 2026.',
                approach:
                    'For this one I had to come up with something completely different, while still capturing the spirit of the college. So I took the opposite approach and made a more wearable, chic design with a modern jersey-like feel, that still makes references to thing related to our college.',
                program: 'Figma',
                footnote: '*The cat logo featured on this design was provided to me and was not something I designed myself.',
                gallery: [Design2White, Mockup4, Mockup5],
            },
        ],
    },
];
