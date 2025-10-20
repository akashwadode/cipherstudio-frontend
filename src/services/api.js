// Simple localStorage "API" (backend later!)
export const saveProject = (projectId, files) => {
  localStorage.setItem(`project_${projectId}`, JSON.stringify(files));
  return { success: true, projectId };
};

export const loadProject = (projectId) => {
  const data = localStorage.getItem(`project_${projectId}`);
  return data ? JSON.parse(data) : null;
};

export const generateId = () => {
  return 'project_' + Date.now();
};