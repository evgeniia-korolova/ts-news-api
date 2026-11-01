import './notifier.css';

class ErrorNotifier {
  private readonly containerId = 'error-notifier-container';

  
  private getOrCreateContainer(): HTMLElement {
      let container = document.getElementById(this.containerId);

      if (!container) {
          container = document.createElement('div');
          container.id = this.containerId;
          
          // Object.assign(container.style, {
          //     position: 'fixed',
          //     top: '120px', 
          //     right: '20px',
          //     zIndex: '2000', 
          //     display: 'flex',
          //     flexDirection: 'column',
          //     gap: '10px',
          //     pointerEvents: 'none', 
          // });

          document.body.appendChild(container);
      }

      return container;
  }

  
  public show(message: string): void {
      const container = this.getOrCreateContainer();

      const toast = document.createElement('div');
      toast.className = 'error-toast';
      toast.style.pointerEvents = 'auto'; 

      
      const messageSpan = document.createElement('span');
      messageSpan.textContent = `⚠️ Error: ${message}`;
      toast.appendChild(messageSpan);

      
      const closeBtn = document.createElement('span');
      closeBtn.className = 'error-toast__close';
      closeBtn.textContent = '×';
      closeBtn.addEventListener('click', () => this.dismiss(toast));
      toast.appendChild(closeBtn);

      container.appendChild(toast);
  }

  
  private dismiss(toast: HTMLElement): void {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease-in-out';

      setTimeout(() => {
          toast.remove();
      }, 300);
  }
}

export default ErrorNotifier;