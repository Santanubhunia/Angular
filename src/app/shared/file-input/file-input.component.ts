import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  HostBinding,
  Optional,
  Self,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FileInputComponent }]
})
export class FileInputComponent
  implements MatFormFieldControl<File[]>, ControlValueAccessor, OnDestroy {
  static nextId = 0;
  @Input() multiple = false;
  @Output() filesChanged = new EventEmitter<File[]>();
  controlType = 'file-input';
  onChange: (_: any) => void;
  onTouched: () => void;
  stateChanges = new Subject<void>();
  focused = false;
  fileString: string;

  @Input() errorStateMatcher: ErrorStateMatcher;

  @Input()
  get value(): File[] | null {
    return this.empty ? null : this.host.nativeElement.value;
  }
  set value(files: File[] | null) {
    this.writeValue(files);
    this.stateChanges.next();
    this.filesChanged.emit(files);
  }

  @HostBinding() id = `app-file-input-${FileInputComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  // tslint:disable-next-line: variable-name
  private _placeholder: string;

  get empty() {
    return (
      !this.host.nativeElement.value ||
      this.host.nativeElement.value.length === 0
    );
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }
  a;
  @HostBinding('class.float')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  // tslint:disable-next-line: variable-name
  private _required = false;

  @HostBinding('class.file-input-disabled')
  get isDisabled() {
    return this.disabled;
  }
  @Input()
  get disabled(): boolean {
    return this.host.nativeElement.disabled;
  }
  set disabled(value: boolean) {
    this.setDisabledState(coerceBooleanProperty(value));
    this.stateChanges.next();
  }

  @HostListener('focusout')
  blur() {
    this.focused = false;
    this.onTouched();
  }

  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList) {
    this.value = files && Array.from(files);
    this.onChange(this.value);
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(e: any) {
    e.preventDefault();

    if (
      (e.target.id !== 'dropzone' && e.target.parentNode.id !== 'dropzone') ||
      this.disabled
    ) {
      e.dataTransfer.effectAllowed = 'none';
      e.dataTransfer.dropEffect = 'none';
    }
  }

  @HostListener('document:drop', ['$event'])
  onDrop(e: any) {
    e.preventDefault();

    if (
      (e.target.id !== 'dropzone' && e.target.parentNode.id !== 'dropzone') ||
      this.disabled
    ) {
      e.dataTransfer.effectAllowed = 'none';
      e.dataTransfer.dropEffect = 'none';
    } else {
      this.value = Array.from(e.dataTransfer.files);
      this.onChange(this.value);
    }
  }

  constructor(
    private fm: FocusMonitor,
    private host: ElementRef,
    private renderer: Renderer2,
    @Optional()
    @Self()
    public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(host.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if (
      (event.target as Element).tagName.toLowerCase() !== 'input' &&
      !this.disabled
    ) {
      this.host.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  open() {
    if (!this.disabled) {
      this.host.nativeElement.querySelector('input').click();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.host.nativeElement, 'disabled', isDisabled);
  }

  clear(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.value = null;
    this.host.nativeElement.querySelector('input').value = null;
    this.onChange(this.value);
  }

  writeValue(files: File[] | null): void {
    const isValid = files?.every(f => f instanceof File);

    this.fileString = files?.map(f => f.name).join(', ') || '';

    this.renderer.setProperty(
      this.host.nativeElement,
      'value',
      isValid ? files : null
    );
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.host.nativeElement);
  }
}
