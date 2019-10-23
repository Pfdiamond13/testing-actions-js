const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const gitHubSecret = core.getInput('GITHUB_TOKEN')

    const octokit = new github.GitHub(gitHubSecret);
  
    const context = github.context.payload;

    const postChecklistAsComment = await octokit.issues.createComment({
      owner: context.repository.full_name.split('/')[0],
      repo: context.repository.full_name.split('/')[1],
      issue_number: context.number,
      body: 'Please verify the following about your PR: \n- [ ] Does the code have tests\n- [ ] Have you thought about how this scales to larger amounts of data\n- [ ] Have you thought about soft deletion - does anything here need audit logging or soft delete to preserve historical data\n- [ ] Does this PR include data migration and will this impact correctness of data for live customers\n - [ ] If this PR has migrations, have you run [schema annotation](https://github.com/ctran/annotate_models)\n',
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
