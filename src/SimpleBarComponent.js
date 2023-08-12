import React, { useEffect } from 'react';
import SimpleBar from './simplebar';

const SimpleBarComponent = () => {
  useEffect(() => {
    initialize();

    function initialize() {
      initializeSimplebar();
      initializeSidebarCollapse();
    }

    function initializeSimplebar() {
      const simplebarElement = document.getElementsByClassName('js-simplebar')[0];

      if (simplebarElement) {
        const simplebarInstance = new SimpleBar(document.getElementsByClassName('js-simplebar')[0]);

        /* Recalculate simplebar on sidebar dropdown toggle */
        const sidebarDropdowns = document.querySelectorAll('.js-sidebar [data-bs-parent]');

        sidebarDropdowns.forEach(link => {
          link.addEventListener('shown.bs.collapse', () => {
            simplebarInstance.recalculate();
          });
          link.addEventListener('hidden.bs.collapse', () => {
            simplebarInstance.recalculate();
          });
        });
      }
    }

    function initializeSidebarCollapse() {
      const sidebarElement = document.getElementsByClassName('js-sidebar')[0];
      const sidebarToggleElement = document.getElementsByClassName('js-sidebar-toggle')[0];

      if (sidebarElement && sidebarToggleElement) {
        sidebarToggleElement.addEventListener('click', () => {
          sidebarElement.classList.toggle('collapsed');

          sidebarElement.addEventListener('transitionend', () => {
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
    }
  }, []);

  return <></>; // Since this component is responsible for DOM manipulation, it doesn't need to render any content.
};

export default SimpleBarComponent;
