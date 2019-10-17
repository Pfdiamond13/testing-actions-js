const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const myInput = core.getInput('myInput');
    console.log(myInput, 'INPUT');
    const myToken = core.getInput('myToken');
    const gitHubSecret = core.getInput('GITHUB_TOKEN')

    const octokit = new github.GitHub(gitHubSecret);
  
    const context = github.context.payload;

    console.log('************', gitHubSecret, 'SECRET');
    console.log('************', myToken, 'TOKEN');
    console.log('************',context, 'CONTEXT')

    console.log({owner: context.repository.full_name.split('/')[0],
    repo: context.repository.full_name.split('/')[1],
    pull_number: context.number,
    body: 'Testing comment',
    commit_id: context.pull_request.base.sha,
    path: 'test.txt',
    position: 1,});
  
    // const prComment = await octokit.pulls.createComment({
    //   owner: context.repository.full_name.split('/')[0],
    //   repo: context.repository.full_name.split('/')[1],
    //   pull_number: context.number,
    //   body: 'Testing comment',
    //   commit_id: context.pull_request.head.sha,
    //   path: 'main.js',
    //   position: 1,

    // })
    const normalComment = await octokit.issues.createComment({
      owner: context.repository.full_name.split('/')[0],
      repo: context.repository.full_name.split('/')[1],
      issue_number: context.number,
      body: 'Your PR is missing one or more of the following checks: \n- [ ] Does the code have tests\n- [ ] Have you thought about how this scales to larger amounts of data\n- [ ] Have you thought about soft deletion\n- [ ] Does this PR include data migration and will this impact correctness of data for live customers\n - [ ] If this PR has migrations, have you run [schema annotation]',
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
