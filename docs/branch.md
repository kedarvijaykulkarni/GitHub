# Branch 

## Branching

The main repository will always hold two evergreen branches:

- master
- stable

The main branch should be considered origin/master and will be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. As a developer, you will be branching and merging from master.

Consider origin/stable to always represent the latest code deployed to production. During day to day development, the stable branch will not be interacted with.

When the source code in the master branch is stable and has been deployed, all of the changes will be merged into stable and tagged with a release number. How this is done in detail will be discussed later.

## Pattern

| Instance        | Branch        | Description, Instructions, Notes                 |
| ----------------|:-------------:| ------------------------------------------------:|
| Stable          | stable        | Accepts merges from Working and Hotfixes         |
| Working         | master        | Accepts merges from Features/Issues and Hotfixes |
| Features/Issues | as per below  | Always branch off HEAD of Working                |
| Hotfix          | hotfix-*      | Always branch off Stable                         |


## Name the branch

<ol>
  <li>
    <b>Use Descriptive Names:</b>  
    <p>Branch names should be clear and descriptive. A good branch name should provide a hint about the purpose of the branch and what changes it contains. For example, use names like `feature/user-authentication` or `bugfix/fix-null-pointer-error`.</p>

    `# good
    $ git checkout -b feature/oauth-migration

    # bad - too vague
    $ git checkout -b login_fix`
  </li>
  <li>
    <b>Prefixes for Branch Types:</b>
    <p>Prepending prefixes to branch names can help categorize branches and make their purpose clear. Common prefixes include:</p>
    <ul>
        <li>
            <p>`feature/`: For new features or enhancements.</p>
            <p>Feature branches are used when developing a new feature or enhancement which has the potential of a development lifespan longer than a single deployment. When starting development, the deployment in which this feature will be released may not be known. No matter when the feature branch will be finished, it will always be merged back into the master branch.</p>
            <p>During the lifespan of the feature development, the lead should watch the master branch (network tool or branch tool in GitHub) to see if there have been commits since the feature was branched. Any and all changes to master should be merged into the feature before merging back to master; this can be done at various times during the project or at the end, but time to handle merge conflicts should be accounted for.</p>
            <p>
                <tbd number> represents the project to which Project Management will be tracked. 
                -- Must branch from: master  
                -- Must merge back into: master  
                -- Branch naming convention: feature-<tbd number>
            </p>
        </li>
        <li>`bugfix/`: For bug fixes.</li>
        <li>`hotfix/`: For urgent fixes to the production environment.</li>
        <li>`release/`: For preparing a release version.</li>
        <li>`chore/`: For maintenance tasks or general changes.</li>
        <li>`docs/`: For documentation-related changes.</li>
        <li>`refactor/`: For code refactoring.</li>
        <li>`test/`: For testing-related changes.</li>
    </ul>
  </li>
  <li>
    <b>Lowercase and Hyphens:</b>
    <p>Stick to lowercase letters and use hyphens to separate words in branch names. This promotes consistency and makes the branch names easier to read.</p>
  </li>
  <li>
    <b>Keep It Short and Sweet:</b>
    <p>Branch names should be concise while still conveying their purpose. Avoid overly long branch names that may be cumbersome to work with.</p>
  </li>
  <li>
    <b>Avoid Special Characters and Spaces:</b>
    <p>Special characters and spaces can lead to issues with various tools and version control systems. Stick to alphanumeric characters and hyphens.</p>
  </li>
  <li>
    <b>Use Issue Numbers:</b>
    <p>If your project uses an issue tracking system (e.g., GitHub issues), consider including the issue number in the branch name. This helps tie branches to specific issues and facilitates tracking. For instance, `feature/issue-123-user-profile`.</p>
  </li>
  <li>
    <b>Use a Consistent Format:</b>
    <p>Decide on a consistent naming format for branches and ensure that all team members follow it. Consistency makes it easier for everyone to understand and work with branches.</p>
  </li>
  <li>
    <b>Avoid Personal Names:</b>
    <p>Branch names like `john-feature` or `susan-bugfix` can be confusing to others. Instead, focus on the purpose of the branch.</p>
  </li>
  <li>
    <b>Short Words:</b>
    <p>Try to keep individual words in branch names relatively short. This enhances readability and prevents names from becoming unwieldy.</p>
  </li>
  <li>
    <b>Be Explicit:</b>
    <p>If there's any ambiguity about the branch's purpose, include more context in the name. It's better to have a slightly longer but clear branch name.</p>
  </li>
  <li>
    <b>Keep Master/Main Clean:</b>
    <p>The main branch (formerly known as "master") is typically reserved for stable code. Avoid working directly on it. Instead, create feature branches and merge them into the main branch when they are ready.</p>
  </li>
  <li>
    <b>Consistent Version Control Workflow:</b>
    <p>It's important to define a clear version control workflow that outlines when and how branches are created, merged, and deleted. This helps maintain a structured and organized repository.</p>
  </li>
</ol>
<p>Remember that these practices can be adapted to fit the needs of your team and project. The key is to have a well-defined and consistently followed convention that makes collaboration and code management more efficient.</p>