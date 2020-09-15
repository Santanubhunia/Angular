export const MockIncidentService = jasmine.createSpyObj('IncidentService', [
  'getConfiguration',
  'addIncident',
  'getIncidents',
  'getChildIncidents',
  'getIncident',
  'patchIncident',
  'updateIncident',
  'updatePaging',
  'updateSort',
  'setActive',
  'nextStep',
  'previousStep',
  'setActiveStep',
  'createIncident'
]);

export const MockChildService = jasmine.createSpyObj('ChildService', [
  'addChild',
  'patchChild',
  'deleteChild'
]);

export const MockCommentService = jasmine.createSpyObj('CommentService', [
  'addComment',
  'patchComment',
  'deleteComment'
]);

export const MockArtifactService = jasmine.createSpyObj('ArtifactService', [
  'addArtifact',
  'patchArtifact',
  'deleteArtifact'
]);

export const MockPersonService = jasmine.createSpyObj('PersonService', [
  'searchChild',
  'searchAdult',
  'saveChild',
  'saveAdult',
  'getPerson'
]);

export const MockCaseService = jasmine.createSpyObj('CaseService', [
  'addCase',
  'getCase',
  'getCases',
  'patchCase',
  'updateCase',
  'updatePaging',
  'updateSort',
  'setActive'
]);

export const MockCaseNoteService = jasmine.createSpyObj('CaseNoteService', [
  'addNote',
  'patchNote',
  'deleteNote'
]);

export const MockNotificationService = jasmine.createSpyObj(
  'NotificationService',
  ['showNotification', 'showNotificationAlert']
);

export const MockUserService = jasmine.createSpyObj('UserService', [
  'getConfiguration',
  'addUser',
  'getAllUsers',
  'getAssignableUsers',
  'getUsers',
  'putUser',
  'deleteUser',
  'setActive'
]);

export const MockBreadcrumbService = jasmine.createSpyObj('BreadcrumbService', [
  'start',
  'updateLabels'
]);
