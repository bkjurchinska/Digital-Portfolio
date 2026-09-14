import { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";
import {InertiaPlugin} from "gsap/InertiaPlugin";
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Menu } from './components/Menu/Menu';
import { Projects } from './components/Projects/Projects';
import { Sushi } from './components/Sushi/Sushi';
import { Skills } from './components/Skills/Skills';
import { ProjectPage } from './components/ProjectPage/ProjectPage';
import { DesignPage } from './components/DesignPage/DesignPage';
import { Gallery } from './components/Gallery/Gallery';
import { Receipt } from './components/Receipt/Receipt';

const PROJECT_COUNT = 4;
const DESIGN_COUNT = 3;

// Which project page (if any) the URL hash points at: #project/1 .. #project/4.
function readProjectHash() {
  const m = window.location.hash.match(/^#project\/(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10) - 1;
  return n >= 0 && n < PROJECT_COUNT ? n : null;
}

// Which design page (if any) the URL hash points at: #design/1 .. #design/3.
function readDesignHash() {
  const m = window.location.hash.match(/^#design\/(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10) - 1;
  return n >= 0 && n < DESIGN_COUNT ? n : null;
}

// The Gallery overlay is a plain on/off, reached from the printed ticket in the
// "Chef's Specials" section: #gallery.
function readGalleryHash() {
  return window.location.hash === '#gallery';
}

// The Receipt overlay is a plain on/off, reached from the "Get receipt and
// pay" button in the "Chef's Specials" section: #receipt.
function readReceiptHash() {
  return window.location.hash === '#receipt';
}

function App() {
  console.log("normalizeScroll active?", !!window.gsap?.core?.globals()?.normalizeScroll);

  // null = nothing open; otherwise 0-based index of the open project / design.
  // Seeded from the URL hash so a refresh keeps you on the open page.
  const [openProject, setOpenProject] = useState(readProjectHash);
  const [openDesign, setOpenDesign] = useState(readDesignHash);
  const [openGallery, setOpenGallery] = useState(readGalleryHash);
  const [openReceipt, setOpenReceipt] = useState(readReceiptHash);
  // Which toast the Projects carousel is showing -- lifted up here so the
  // Menu can point the carousel at a specific project before scrolling to it.
  const [activeToastIndex, setActiveToastIndex] = useState(0);
  const prevOverlayOpen = useRef(
    openProject !== null || openDesign !== null || openGallery || openReceipt
  );

  // Mirror the open overlay into the URL hash. Opening (from nothing) pushes a
  // history entry so the browser Back button closes it; switching pages or
  // closing just replaces it, so arrow-key navigation doesn't pile up history.
  useEffect(() => {
    const wasOpen = prevOverlayOpen.current;
    const isOpen = openProject !== null || openDesign !== null || openGallery || openReceipt;
    prevOverlayOpen.current = isOpen;

    const noHash = window.location.pathname + window.location.search;
    let target = noHash;
    if (openProject !== null) target = `#project/${openProject + 1}`;
    else if (openDesign !== null) target = `#design/${openDesign + 1}`;
    else if (openGallery) target = '#gallery';
    else if (openReceipt) target = '#receipt';

    if (!wasOpen && isOpen) {
      window.history.pushState(null, '', target);
    } else {
      window.history.replaceState(null, '', target);
    }
  }, [openProject, openDesign, openGallery, openReceipt]);

  // Follow browser Back/Forward (and any manual hash edit).
  useEffect(() => {
    const onHashChange = () => {
      setOpenProject(readProjectHash());
      setOpenDesign(readDesignHash());
      setOpenGallery(readGalleryHash());
      setOpenReceipt(readReceiptHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return <div className={styles.App}>
    <Hero />
    <Menu
      onSelectProject={setActiveToastIndex}
      onOpenReceipt={() => { setOpenProject(null); setOpenDesign(null); setOpenGallery(false); setOpenReceipt(true); }}
    />
    <About />
    <Projects
      onOpenProject={(n) => { setOpenDesign(null); setOpenProject(n); }}
      activeToast={activeToastIndex}
      onActiveToastChange={setActiveToastIndex}
    />
    <Sushi />
    <Skills
      onOpenDesign={(n) => { setOpenProject(null); setOpenGallery(false); setOpenReceipt(false); setOpenDesign(n); }}
      onOpenGallery={() => { setOpenProject(null); setOpenDesign(null); setOpenReceipt(false); setOpenGallery(true); }}
      onOpenReceipt={() => { setOpenProject(null); setOpenDesign(null); setOpenGallery(false); setOpenReceipt(true); }}
    />
    {openProject !== null && (
      <ProjectPage
        index={openProject}
        onIndexChange={setOpenProject}
        onClose={() => setOpenProject(null)}
      />
    )}
    {openDesign !== null && (
      <DesignPage
        index={openDesign}
        onIndexChange={setOpenDesign}
        onClose={() => setOpenDesign(null)}
      />
    )}
    {openGallery && (
      <Gallery
        onClose={() => setOpenGallery(false)}
        onOpenReceipt={() => { setOpenProject(null); setOpenDesign(null); setOpenGallery(false); setOpenReceipt(true); }}
      />
    )}
    {openReceipt && (
      <Receipt onClose={() => setOpenReceipt(false)} />
    )}
  </div>;
}

export default App;
