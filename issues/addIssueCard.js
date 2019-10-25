const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const gitHubSecret = core.getInput('GITHUB_TOKEN')

    const octokit = new github.GitHub(gitHubSecret);
  
    const context = github.context.payload;

    const createIssueCard = await octokit.projects.createCard({
      column_id: '6843168',
      content_id: context.issue.id,
      content_type: 'Issue'
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
