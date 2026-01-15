const learnMoreBtn = document.querySelector('.discover-btn');
const overlay = document.getElementById('overview');
const closeBtn = document.querySelector('.close-btn');

function openOverlay() {
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

learnMoreBtn.addEventListener('click', function (e) {
  e.preventDefault();
  openOverlay();
});

closeBtn.addEventListener('click', closeOverlay);

overlay.addEventListener('click', function (e) {
  if (e.target === overlay) {
    closeOverlay();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeOverlay();
  }
});




// ────────────────────────────────────────────────
// Wait for DOM + Barba ready
document.addEventListener('DOMContentLoaded', () => {
  barba.init({
    debug: true,                  // ← shows logs in console – very helpful!
    
    transitions: [{
      name: 'fade',
      
      leave({ current }) {
        // Fade out old page
        return gsap.to(current.container, { 
          opacity: 0, 
          duration: 0.5,
          ease: "power2.out"
        });
      },
      
      enter({ next }) {
        // Reset scroll + fade in new page
        window.scrollTo({ top: 0, behavior: 'instant' });
        gsap.from(next.container, { 
          opacity: 0, 
          y: 30, 
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }],

    // Re-run your custom JS after each page change
    views: [
      {
        namespace: 'index',
        afterEnter() {
          console.log('Index page loaded → run index-specific code');
          // init your index-specific functions here if needed
        }
      },
      {
        namespace: 'aspects',
        afterEnter() {
          console.log('Aspects page loaded → run aspects-specific code');
          // Re-init overlay, scroll detection, image hovers, etc.
          initOverlay();        // ← call your functions again!
          initScrollDetection();
        }
      }
    ]
  });

  // Your original functions (overlay, scroll detection, etc.)
  function initOverlay() {
    const learnMoreBtn = document.querySelector('.discover-btn');
    if (!learnMoreBtn) return;
    // ... rest of your overlay code ...
  }

  function initScrollDetection() {
    // ... your wheel/touch/scroll page transition code ...
  }

  // Run once on first load
  initOverlay();
  initScrollDetection();
});

//refences
function openReferences() {
  const ref = document.getElementById("references");
  ref.classList.add("show");
}

function closeReferences() {
  const ref = document.getElementById("references");
  ref.classList.remove("show");
}

function initOverlay() {
  const openBtn = document.getElementById('openOverview');
  const closeBtn = document.getElementById('closeOverview');
  const overviewModal = document.getElementById('overview');

  if (!openBtn || !overviewModal) return;

  openBtn.onclick = () => {
    overviewModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  if (closeBtn) {
    closeBtn.onclick = () => {
      overviewModal.classList.add('hidden');
      document.body.style.overflow = '';
    };
  }

  overviewModal.onclick = (e) => {
    if (e.target === overviewModal) {
      overviewModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  document.onkeydown = (e) => {
    if (e.key === 'Escape' && !overviewModal.classList.contains('hidden')) {
      overviewModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };
}



//Nodes 

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = canvas.offsetWidth;
let height = canvas.height = canvas.offsetHeight;

window.addEventListener('resize', () => {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
});

const nodes = [];
const NODE_COUNT = 50;

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2.5 + 2; // bigger nodes
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 50, 150, 0.8)'; // dark blue, visible
    ctx.fill();
  }
}

// Create nodes
for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push(new Node());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 50, 150, ${0.35 * (1 - distance / 120)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Move and draw nodes
  nodes.forEach(node => {
    node.move();
    node.draw();
  });

  requestAnimationFrame(animate);
}

animate();

//upp
// Overview modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openOverview');
    const closeBtn = document.getElementById('closeOverview');
    const overviewModal = document.getElementById('overview');
    
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            overviewModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overviewModal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside
    overviewModal.addEventListener('click', (e) => {
        if (e.target === overviewModal) {
            overviewModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overviewModal.classList.contains('hidden')) {
            overviewModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});

// References popup functionality
function toggleReferences() {
    const refPopup = document.getElementById('references');
    refPopup.style.display = refPopup.style.display === 'block' ? 'none' : 'block';
}

function closeReferences() {
    document.getElementById('references').style.display = 'none';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation for cards when they enter viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.innovation-card, .app-card').forEach(card => {
    observer.observe(card);
});

//TLS PAGE 

// TLS Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup handshake interaction
    setupHandshake();
    
    // Setup cipher suite interactions
    setupCiphers();
    
    // Setup timeline interactions
    setupTimeline();
    
    // Setup modal functionality
    setupModal();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup statistics animations
    setupStatistics();
});

function initAnimations() {
    // Animate shield rings
    const rings = document.querySelectorAll('.ring');
    rings.forEach((ring, index) => {
        ring.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate data flow
    const dataFlow = document.querySelector('.data-flow');
    if (dataFlow) {
        setInterval(() => {
            dataFlow.style.animation = 'none';
            setTimeout(() => {
                dataFlow.style.animation = 'flow 2s infinite linear';
            }, 10);
        }, 2000);
    }
}

function setupHandshake() {
    const steps = document.querySelectorAll('.step');
    const arrows = document.querySelectorAll('.step-arrow');
    
    // Animate steps sequentially
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            step.style.transition = 'all 0.5s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
            
            // Animate arrow if present
            const arrow = step.querySelector('.step-arrow');
            if (arrow) {
                setTimeout(() => {
                    arrow.style.animation = 'moveArrow 1.5s infinite';
                }, 300);
            }
        }, index * 300);
        
        // Add click interaction
        step.addEventListener('click', function() {
            // Highlight step
            this.style.backgroundColor = 'rgba(74, 158, 255, 0.1)';
            this.style.borderColor = '#4a9eff';
            
            // Reset other steps
            steps.forEach(s => {
                if (s !== this) {
                    s.style.backgroundColor = '';
                    s.style.borderColor = '';
                }
            });
            
            // Show step details
            const stepNumber = this.querySelector('.step-number').textContent;
            showStepDetails(stepNumber);
        });
    });
    
    // Add hover effects to client/server nodes
    const nodes = document.querySelectorAll('.client-node, .server-node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            const icon = this.querySelector('.node-icon');
            icon.style.backgroundColor = 'rgba(74, 158, 255, 0.2)';
            icon.style.borderColor = '#4a9eff';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            const icon = this.querySelector('.node-icon');
            icon.style.backgroundColor = '';
            icon.style.borderColor = '';
        });
    });
}

function showStepDetails(stepNumber) {
    const stepDetails = {
        '1': 'Client sends supported TLS versions, cipher suites, and random number.',
        '2': 'Server chooses cipher suite, sends certificate, and random number.',
        '3': 'Server proves ownership of certificate with digital signature.',
        '4': 'Client and server exchange encrypted pre-master secret.',
        '5': 'Both parties verify handshake and switch to encrypted communication.'
    };
    
    // Create or update info panel
    let infoPanel = document.querySelector('.step-info-panel');
    if (!infoPanel) {
        infoPanel = document.createElement('div');
        infoPanel.className = 'step-info-panel';
        document.querySelector('.handshake-section').appendChild(infoPanel);
    }
    
    infoPanel.innerHTML = `
        <h4>Step ${stepNumber} Details</h4>
        <p>${stepDetails[stepNumber]}</p>
        <button class="close-info">Close</button>
    `;
    
    infoPanel.style.display = 'block';
    
    // Close button
    infoPanel.querySelector('.close-info').addEventListener('click', function() {
        infoPanel.style.display = 'none';
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (infoPanel.style.display !== 'none') {
            infoPanel.style.display = 'none';
        }
    }, 5000);
}

function setupCiphers() {
    const cipherCards = document.querySelectorAll('.cipher-card');
    const algorithms = document.querySelectorAll('.algo');
    
    // Card hover effects
    cipherCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(74, 158, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(74, 158, 255, 0.2)';
        });
    });
    
    // Algorithm click effects
    algorithms.forEach(algo => {
        algo.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = 'rgba(74, 158, 255, 0.3)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.backgroundColor = '';
            }, 300);
            
            // Show algorithm info
            const algorithm = this.textContent;
            const category = this.closest('.cipher-card').querySelector('h3').textContent;
            
            console.log(`Selected: ${algorithm} (${category})`);
            // Could add modal popup with detailed info here
        });
    });
}

function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    // Animate timeline on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const dot = item.querySelector('.timeline-dot');
                
                // Animate dot
                dot.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1)';
                }, 300);
                
                // Animate content
                const content = item.querySelector('.timeline-content');
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
                
                // Mark as animated
                item.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    // Set initial state and observe
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        content.style.opacity = '0';
        content.style.transform = 'translateX(-20px)';
        content.style.transition = 'all 0.5s ease';
        
        observer.observe(item);
        
        // Click interaction
        item.addEventListener('click', function() {
            const year = this.querySelector('.timeline-year').textContent;
            const title = this.querySelector('h4').textContent;
            
            // Highlight clicked item
            timelineItems.forEach(i => i.classList.remove('active-clicked'));
            this.classList.add('active-clicked');
            
            // Could show detailed version info here
            console.log(`Version selected: ${title} (${year})`);
        });
    });
    
    // Animate active dot
    const activeDot = document.querySelector('.timeline-item.active .timeline-dot');
    if (activeDot) {
        setInterval(() => {
            activeDot.style.boxShadow = '0 0 30px rgba(0, 255, 170, 0.7)';
            setTimeout(() => {
                activeDot.style.boxShadow = '0 0 20px rgba(0, 255, 170, 0.5)';
            }, 500);
        }, 2000);
    }
}

function setupModal() {
    const modal = document.getElementById('referencesModal');
    const showBtn = document.getElementById('showRefs');
    const closeBtn = document.getElementById('closeModal');
    
    if (!modal || !showBtn || !closeBtn) return;
    
    // Show modal
    showBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Add animation to modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-50px)';
    
    modal.addEventListener('transitionend', function() {
        if (modal.classList.contains('show')) {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }
    });
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .cipher-card, .benefit, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.5s ease';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

function setupStatistics() {
    const statBars = document.querySelectorAll('.bar-fill');
    
    // Animate bars when in view
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
                
                // Animate counter
                const statValue = bar.closest('.stat-item').querySelector('.stat-value');
                if (statValue) {
                    animateCounter(statValue);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => barObserver.observe(bar));
}

function animateCounter(element) {
    const originalText = element.textContent;
    const value = parseFloat(originalText);
    
    if (isNaN(value)) return;
    
    element.textContent = '0';
    
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const suffix = originalText.includes('%') ? '%' : '';
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * value);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Certificate chain interaction
document.querySelectorAll('.cert-level').forEach(level => {
    level.addEventListener('click', function() {
        const type = this.classList.contains('root') ? 'Root CA' :
                    this.classList.contains('intermediate') ? 'Intermediate CA' : 'End Entity';
        
        // Visual feedback
        this.style.backgroundColor = 'rgba(74, 158, 255, 0.1)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 500);
        
        // Could show certificate details
        console.log(`Certificate type: ${type}`);
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Tab through interactive elements
    if (e.key === 'Tab') {
        const focusable = document.querySelectorAll('button, a, .step, .algo, .timeline-item, .cert-level');
        const current = document.activeElement;
        const index = Array.from(focusable).indexOf(current);
        
        if (e.shiftKey && index > 0) {
            focusable[index - 1].focus();
            e.preventDefault();
        } else if (!e.shiftKey && index < focusable.length - 1) {
            focusable[index + 1].focus();
            e.preventDefault();
        }
    }
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize tooltips
function initTooltips() {
    const elements = document.querySelectorAll('.node-icon, .cipher-icon, .feature-icon, .benefit-icon');
    
    elements.forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.parentElement.querySelector('h3, h4').textContent;
        
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });
        
        el.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

// Call initTooltips after DOM is fully loaded
setTimeout(initTooltips, 1000);

//TLS.html
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeCardInteractions();
    initializeProtocolVisualization();
    initializeMetricsAnimation();
    initializeMobileNavigation();
    initializeIETFDetails();
});

// Card Interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.cyber-card');
    
    cards.forEach(card => {
        // Hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.2)';
            
            // Add subtle glow to the tech icon
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.textShadow = '0 0 15px currentColor';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            // Remove glow from icon
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.textShadow = 'none';
            }
        });
        
        // Card action buttons
        const actionButtons = card.querySelectorAll('.card-action');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const cardTech = card.getAttribute('data-tech');
                handleCardAction(cardTech, this.textContent.trim());
            });
        });
        
        // Entire card click for details view
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-action')) {
                const tech = this.getAttribute('data-tech');
                showTechDetails(tech);
            }
        });
    });
}

// Protocol Visualization Animation
function initializeProtocolVisualization() {
    const visualLine = document.querySelector('.visual-line');
    const encryptedFlow = document.querySelector('.encrypted-flow');
    
    if (!visualLine || !encryptedFlow) return;
    
    // Animate the handshake flow
    let step = 0;
    const handshakeSteps = visualLine.querySelectorAll('.handshake-step');
    
    function animateHandshake() {
        if (step >= handshakeSteps.length) step = 0;
        
        // Reset all steps
        handshakeSteps.forEach(step => {
            step.style.backgroundColor = 'var(--primary-dark)';
            step.style.color = 'var(--text-primary)';
        });
        
        // Highlight current step
        if (handshakeSteps[step]) {
            handshakeSteps[step].style.backgroundColor = 'var(--accent-blue)';
            handshakeSteps[step].style.color = 'var(--primary-dark)';
        }
        
        // Animate encryption icons
        const locks = encryptedFlow.querySelectorAll('i');
        locks.forEach((lock, index) => {
            setTimeout(() => {
                lock.style.transform = 'scale(1.2)';
                lock.style.color = 'var(--accent-green)';
                
                setTimeout(() => {
                    lock.style.transform = 'scale(1)';
                    if (step % 2 === 0) {
                        lock.style.color = 'var(--accent-green)';
                    } else {
                        lock.style.color = 'var(--accent-blue)';
                    }
                }, 300);
            }, index * 200);
        });
        
        step++;
        setTimeout(animateHandshake, 2000);
    }
    
    // Start animation after a delay
    setTimeout(animateHandshake, 1000);
}

// Metrics Counter Animation
function initializeMetricsAnimation() {
    const metrics = [
        { selector: '.metric-card:nth-child(1) h4', target: 300, suffix: 'ms' },
        { selector: '.metric-card:nth-child(2) h4', target: 100, suffix: '%' },
        { selector: '.metric-card:nth-child(3) h4', target: 50, suffix: '%' },
        { selector: '.metric-card:nth-child(4) h4', target: 0, suffix: '-RTT' }
    ];
    
    let animated = false;
    
    function animateMetrics() {
        if (animated) return;
        
        const metricSection = document.querySelector('.metrics-section');
        if (!metricSection) return;
        
        const sectionPosition = metricSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (sectionPosition.top < windowHeight - 100) {
            animated = true;
            
            metrics.forEach(metric => {
                const element = document.querySelector(metric.selector);
                if (!element) return;
                
                let current = 0;
                const increment = metric.target / 30; // 30 frames
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= metric.target) {
                        current = metric.target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.round(current) + metric.suffix;
                }, 50);
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateMetrics);
    // Initial check
    animateMetrics();
}

// Mobile Navigation
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'var(--primary-dark)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderTop = '1px solid var(--border-color)';
            navLinks.style.zIndex = '1000';
        }
    });
    
    // Close mobile menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderTop = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// IETF Details Modal
function initializeIETFDetails() {
    const rfcLinks = document.querySelectorAll('.rfc-link');
    
    rfcLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showRFCModal();
        });
    });
}

// Card Action Handler
function handleCardAction(tech, action) {
    const actions = {
        'tls': {
            'Protocol Analysis': () => showAnalysisModal('TLS 1.3'),
            'Test Suite': () => showTestSuite()
        },
        'pqc': {
            'Migration Guide': () => showMigrationGuide()
        },
        'impl': {
            'Deployment Guide': () => showDeploymentGuide()
        }
    };
    
    if (actions[tech] && actions[tech][action]) {
        actions[tech][action]();
    }
}

// Modal Functions
function showTechDetails(tech) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${getTechTitle(tech)} Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${getTechDetails(tech)}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showRFCModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>RFC 8446 - TLS 1.3</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="rfc-modal-content">
                    <div class="rfc-meta-modal">
                        <div><strong>Status:</strong> Standards Track</div>
                        <div><strong>Published:</strong> August 2018</div>
                        <div><strong>Obsoletes:</strong> RFC 5246, 6176</div>
                        <div><strong>Category:</strong> PROPOSED STANDARD</div>
                    </div>
                    <h4>Abstract</h4>
                    <p>This document specifies version 1.3 of the Transport Layer Security (TLS) protocol. TLS allows client/server applications to communicate over the Internet in a way that is designed to prevent eavesdropping, tampering, and message forgery.</p>
                    
                    <h4>Key Changes from TLS 1.2</h4>
                    <ul>
                        <li>Removed support for MD5 and SHA-224 hash functions</li>
                        <li>Removed support for static RSA and DH key exchange</li>
                        <li>Removed support for CBC mode cipher suites</li>
                        <li>Removed support for RC4 stream cipher</li>
                        <li>Removed support for EXPORT-strength ciphers</li>
                        <li>Added 0-RTT mode for reduced latency</li>
                        <li>Mandated use of PFS key exchange</li>
                        <li>Encrypted all handshake messages after ClientHello</li>
                    </ul>
                    
                    <div class="modal-actions">
                        <a href="https://datatracker.ietf.org/doc/html/rfc8446" target="_blank" class="btn-primary">
                            <i class="fas fa-external-link-alt"></i> View Full RFC
                        </a>
                        <a href="https://tools.ietf.org/html/rfc8446.txt" target="_blank" class="btn-secondary">
                            <i class="fas fa-download"></i> Download TXT
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Helper Functions
function getTechTitle(tech) {
    const titles = {
        'tls': 'Transport Layer Security 1.3',
        'pqc': 'Post-Quantum Cryptography',
        'impl': 'Implementation & Deployment'
    };
    return titles[tech] || 'Technology Details';
}

function getTechDetails(tech) {
    const details = {
        'tls': `
            <h4>Technical Specifications</h4>
            <ul>
                <li><strong>Protocol Version:</strong> 1.3</li>
                <li><strong>RFC Number:</strong> 8446</li>
                <li><strong>Published:</strong> August 2018</li>
                <li><strong>Key Exchange:</strong> DH, ECDH</li>
                <li><strong>Cipher Suites:</strong> AES-GCM, ChaCha20-Poly1305</li>
                <li><strong>Authentication:</strong> RSA-PSS, Ed25519, Ed448</li>
            </ul>
            
            <h4>Security Features</h4>
            <ul>
                <li>Perfect Forward Secrecy (mandatory)</li>
                <li>Encrypted handshake (except ClientHello)</li>
                <li>Downgrade protection</li>
                <li>Session resumption with 0-RTT</li>
                <li>Removed weak cryptographic algorithms</li>
            </ul>
        `,
        'pqc': `
            <h4>NIST Standardization Process</h4>
            <p>The National Institute of Standards and Technology (NIST) has selected four algorithms for standardization:</p>
            <ul>
                <li><strong>CRYSTALS-Kyber:</strong> Key encapsulation mechanism</li>
                <li><strong>CRYSTALS-Dilithium:</strong> Digital signature scheme</li>
                <li><strong>FALCON:</strong> Digital signature scheme</li>
                <li><strong>SPHINCS+:</strong> Stateless hash-based signature</li>
            </ul>
            
            <h4>Migration Timeline</h4>
            <p>Organizations should begin planning for post-quantum migration now, with full implementation expected by 2030.</p>
        `,
        'impl': `
            <h4>Implementation Status</h4>
            <p>TLS 1.3 is now widely implemented across major platforms:</p>
            <ul>
                <li><strong>Web Browsers:</strong> Chrome, Firefox, Safari, Edge</li>
                <li><strong>Libraries:</strong> OpenSSL, BoringSSL, LibreSSL, GnuTLS</li>
                <li><strong>Operating Systems:</strong> Windows, macOS, Linux distributions</li>
                <li><strong>Cloud Providers:</strong> AWS, Google Cloud, Azure</li>
            </ul>
            
            <h4>Deployment Statistics</h4>
            <p>As of 2024, TLS 1.3 adoption exceeds 90% among top websites and continues to grow.</p>
        `
    };
    return details[tech] || '<p>Details not available.</p>';
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 14, 23, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 2rem;
    }
    
    .modal-content {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--accent-blue);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .rfc-meta-modal {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: rgba(0, 212, 255, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(0, 212, 255, 0.1);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 1rem;
        }
        
        .rfc-meta-modal {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(modalStyles);

// Add scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe cards and metrics
    document.querySelectorAll('.cyber-card, .metric-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations
initializeScrollAnimations();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`TLS 1.3 Site loaded in ${loadTime}ms`);
    });
}

// Add service worker for offline capability (basic example)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// Export functions for testing (if needed)
window.tlsSite = {
    showTechDetails,
    showRFCModal,
    handleCardAction
};



//QUA
