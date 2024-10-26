document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            const projectFile = project.getAttribute('data-project');
            window.open(projectFile, '_blank'); // Opens the project in a new tab
        });
    });
});
