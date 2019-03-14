
import { TypeSaveProperty, PropertyNamesOnly, Nested, KeyValuePair } from 'dotup-ts-types';
import { BaseGenerator, GeneratorOptions, InquirerQuestionType } from '../BaseGenerator';
import { Question } from 'yeoman-generator';
import { IStepQuestion } from '../QuestionWithAnswer';
import { GitGenerator, GitQuestions } from '../git/GitGenerator';
import * as path from 'path';

export enum ProjectQuestions {
  projectType = 'projectType',
  projectName = 'projectName',
  useGit = 'useGit',
  createFolder = "createFolder"
}

export enum ProjectType {
  app,
  library
}

// export default!!
export default class ProjectGenerator extends BaseGenerator<ProjectQuestions> {

  constructor(args: string | string[], options: GeneratorOptions<ProjectQuestions>) {
    super(args, options);
    super.registerMethod(this, 'prompting');

    if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
      this.appname = 'tmp';
      if (path.basename(this.destinationPath().toLowerCase()) !== 'tmp') {
        this.destinationRoot(path.join(this.destinationPath(), 'tmp'));
      }
    }
  }

  async initializing(): Promise<void> {

    this.logYellow(`Project path: '${this.destinationPath()}'`);

    this.questions[ProjectQuestions.projectType] = {
      // name: GitQuestions.username,
      type: InquirerQuestionType.list,
      message: 'Project Type',
      store: true,
      nextQuestion: ProjectQuestions.projectName,
      choices: [
        {
          name: ProjectType[ProjectType.library],
          value: ProjectType.library
        },
        {
          name: ProjectType[ProjectType.app],
          value: ProjectType.app
        }
      ]
    };

    this.questions[ProjectQuestions.projectName] = {
      type: InquirerQuestionType.input,
      message: 'Project Name',
      default: this.getDefaultProjectName(),
      validate: v => this.validateString(v),
      nextQuestion: ProjectQuestions.createFolder
    };

    this.questions[ProjectQuestions.createFolder] = {
      type: InquirerQuestionType.confirm,
      message: () => `Create folder '${this.answers.projectName}' ?`,
      default: 'y',
      when: () => !this.destinationIsProjectFolder(this.answers.projectName),
      nextQuestion: ProjectQuestions.useGit
    };

    this.questions[ProjectQuestions.useGit] = {
      type: InquirerQuestionType.confirm,
      message: 'Configure git?',
      default: this.options.useGit,
    };

    this.currentStep = ProjectQuestions.projectType;
  }

  async prompting(): Promise<void> {
    await super.prompting();

    if (this.answers.useGit) {

      // Load git generator
      this.composeWith(
        {
          Generator: GitGenerator,
          path: require.resolve('../git/index')
        },
        {
          [GitQuestions.rootPath]: this.destinationPath()
        }
      );

    }

  }

  async configuring(): Promise<void> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);

    this.log('Method configuring.');
  }
  async default(): Promise<void> {
    this.log('Method default.');
  }
  async writing(): Promise<void> {
    this.log('Method writing.');
  }
  async conflicts(): Promise<void> {
    this.log('Method conflicts.');
  }
  async install(): Promise<void> {
    this.log('Method isntall.');
  }
  async end(): Promise<void> {
    this.log('Method end.');
  }

}
