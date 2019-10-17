const github = require ('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const myInput = core.getInput('myInput');
    console.log(myInput, 'INPUT');
    const myToken = core.getInput('repo-token');

    const octokit = new github.GitHub(myToken);
  
    const context = github.context.payload;
  
    console.log(myToken, 'TOKEN');
    console.log(context, 'CONTEXT')
  
    const prComment = await octokit.pulls.createComment({
      owner: context.repository.full_name.split('/')[0],
      repo: context.repository.full_name.split('/')[1],
      pull_number: context.number,
      body: 'Testing comment',
      commit_id: context.sha,
      path: 'Testing',
      position: 1,


    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
