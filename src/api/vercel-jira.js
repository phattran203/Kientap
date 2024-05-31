// api/vercel-jira.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const deployment = req.body;

    // Kiểm tra trạng thái deployment
    if (deployment.state === 'READY' || deployment.state === 'ERROR') {
      // Tạo issue mới trên Jira
      const jiraResponse = await createJiraIssue(deployment);

      if (jiraResponse.ok) {
        res.status(200).json({ message: 'Issue created successfully' });
      } else {
        res.status(500).json({ message: 'Failed to create issue' });
      }
    } else {
      res.status(200).json({ message: 'No action needed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Hàm tạo issue mới trên Jira
async function createJiraIssue(deployment) {
  const jiraUrl = 'https://tpt01113.atlassian.net/rest/api/2/issue';
  const jiraAuth = 'Basic ' + Buffer.from('tpt01113@gmail.com:your_api_token').toString('base64');

  const issueData = {
    fields: {
      project: {
        key: 'PROJECT_KEY', // Thay thế PROJECT_KEY bằng key dự án Jira của bạn
      },
      summary: `Deployment ${deployment.state}: ${deployment.url}`,
      description: `Deployment ${deployment.state} for project ${deployment.project.name}.\n\n${deployment.inspectorUrl}`,
      issuetype: {
        name: 'Task',
      },
    },
  };

  return fetch(jiraUrl, {
    method: 'POST',
    headers: {
      'Authorization': jiraAuth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  });
}
