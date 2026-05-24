// URBAN TECH — scroll to active service content after selecting a service on mobile/tablet
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('[data-service-tab]');
  if (!tabs.length) return;

  const getHeaderOffset = () => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.round(headerHeight + 10);
  };

  const scrollToServicePanel = (serviceKey) => {
    if (window.innerWidth >= 1200) return;

    const panel = document.querySelector(`[data-service-panel="${serviceKey}"]`);
    const target = panel ? (panel.querySelector('.service-hero-card') || panel) : document.getElementById('servicesContent');
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth'
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const serviceKey = tab.dataset.serviceTab;
      window.setTimeout(() => scrollToServicePanel(serviceKey), 80);
    });
  });
});
