export async function generateAIAssets(profile) {
  const promptSummary = `${profile.fullName || 'Candidate'} - ${profile.profession || 'Professional'} with ${profile.yearsOfExperience || '0'} years experience`;
  return {
    cvPdfUrl: 'https://example.com/generated-cv.pdf',
    coverLetter: `Dear Hiring Manager,\nI am excited to apply for ${profile.preferredJobPosition || 'the role'}...`,
    emailSubject: `Application - ${profile.preferredJobPosition || profile.profession || 'Role'}`,
    emailBody: `Hello,\nPlease find my CV attached for consideration.\nRegards, ${profile.fullName || 'Candidate'}`,
    jobMatchScore: Math.floor(70 + Math.random() * 30),
    cvOptimization: ['Add quantifiable achievements', 'Tailor summary to target country market'],
    interviewTrainerQuestions: ['Tell me about yourself.', 'Why do you want to work abroad?'],
    summary: promptSummary
  };
}
