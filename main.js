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
  
    const prComment = await octokit.pulls.createComment({
      owner: context.repository.full_name.split('/')[0],
      repo: context.repository.full_name.split('/')[1],
      pull_number: context.number,
      body: 'Testing comment',
      commit_id: context.pull_request.base.sha,
      path: 'Testing',
      position: 1,


    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
