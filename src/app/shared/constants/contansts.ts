import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export const loadingConfiguration = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    backdropBackgroundColour: 'rgba(248, 250, 251, 0.1)',
    backdropBorderRadius: '4px',
    primaryColour: '#3F51B5',
    secondaryColour: '#ffffff',
    tertiaryColour: '#ffffff',
    fullScreenBackdrop: true
}

export const editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: false,
      height: '150px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};