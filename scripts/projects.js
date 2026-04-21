// ============================================
// PROJECTS FILTERING & INTERACTIONS
// ============================================

const ProjectsManager = {
    init() {
        // If filtering is needed in the future
        this.projects = document.querySelectorAll('.project-card');
        this.initProjectInteractions();
    },
    
    initProjectInteractions() {
        this.projects.forEach(project => {
            // Add any project-specific interactions here
            const links = project.querySelectorAll('.project-links a');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Add ripple effect or other interactions
                });
            });
        });
    }
};

export default ProjectsManager;

