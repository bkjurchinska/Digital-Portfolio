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
import { MobileWarning } from './components/MobileWarning/MobileWarning';
import { Loader } from './components/Loader/Loader';
import { useAssetPreload } from './components/Loader/useAssetPreload';

const PROJECT_COUNT = 4;
const DESIGN_COUNT = 3;
const SMALL_SCREEN_QUERY = '(max-width: 768px)';
const LOADER_FADE_MS = 500;

function readProjectHash() {
  const m = window.location.hash.match(/^#project\/(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10) - 1;
  return n >= 0 && n < PROJECT_COUNT ? n : null;
}

function readDesignHash() {
  const m = window.location.hash.match(/^#design\/(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10) - 1;
  return n >= 0 && n < DESIGN_COUNT ? n : null;
}

function readGalleryHash() {
  return window.location.hash === '#gallery';
}

function readReceiptHash() {
  return window.location.hash === '#receipt';
}

function App() {
  console.log("normalizeScroll active?", !!window.gsap?.core?.globals()?.normalizeScroll);

  const [openProject, setOpenProject] = useState(readProjectHash);
  const [openDesign, setOpenDesign] = useState(readDesignHash);
  const [openGallery, setOpenGallery] = useState(readGalleryHash);
  const [openReceipt, setOpenReceipt] = useState(readReceiptHash);
  
  const [activeToastIndex, setActiveToastIndex] = useState(0);
  const prevOverlayOpen = useRef(
    openProject !== null || openDesign !== null || openGallery || openReceipt
  );

  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.matchMedia(SMALL_SCREEN_QUERY).matches
  );
  const [smallScreenAcknowledged, setSmallScreenAcknowledged] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(SMALL_SCREEN_QUERY);
    const onChange = (e) => setIsSmallScreen(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

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

  const showMobileWarning = isSmallScreen && !smallScreenAcknowledged;
  const { progress, ready } = useAssetPreload(!showMobileWarning);
  const [loaderFadingOut, setLoaderFadingOut] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  useEffect(() => {
    if (!ready) return;
    setLoaderFadingOut(true);
    const t = window.setTimeout(() => setLoaderMounted(false), LOADER_FADE_MS);
    return () => window.clearTimeout(t);
  }, [ready]);

  if (showMobileWarning) {
    return <MobileWarning onContinue={() => setSmallScreenAcknowledged(true)} />;
  }

  return <>
    {loaderMounted && <Loader progress={progress} fadingOut={loaderFadingOut} />}
    {ready && <div className={styles.App}>
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
    </div>}
  </>;
}

export default App;
