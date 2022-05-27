import { Output, EventEmitter, ChangeDetectorRef, OnDestroy, Directive } from '@angular/core';
import { Languages } from '../Services/Libs/Languages';
import { Styles } from 'src/app/Services/Libs/Styles';

@Directive({})

  export abstract class ComponentBase implements OnDestroy {
    @Output() onAction :EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private changeRef: ChangeDetectorRef)
    {
        Languages.instance.registerListener(this);
        Styles.instance.registerListener(this);
    }

    public ngOnDestroy() {
        Languages.instance.unregisterListener(this);
    }

    public getWord(key: string) {
        return Languages.instance.getWord(key);
    }

    public detectChanges() {
        // if (this.changeRef['destroyed'] == false) {
            this.changeRef.detectChanges();
        // }
    }

    public select(lang: any) {
        Languages.instance.selectLanguage(lang);
    }

    public get selectedLanguage()
    {
        return Languages.instance.selected;
    }

    public getBackground(name:string)
    {
        return {"background-color": Styles.instance.getStyle(name)};
    }

    public getColor(name: string)
    {
        return {"color": Styles.instance.getStyle(name)};
    }

    public getBorder(name:string)
    {
        return {"border-color":Styles.instance.getStyle(name)};
    }

    public getRawColor(name: string): void {
        return Styles.instance.getStyle(name);
    }

    public onStyleChange(style: any): void {
      this.changeRef.detectChanges();
    }

    public onLanguageChange(lang: any): void {
      this.changeRef.detectChanges();
    }

    public emitAction(event: string, data: any = null) : void{
        this.onAction.emit( {action: event, data: data} );
    }

    public bubbleAction(e: any): void {
        this.onAction.emit(e);
    }
}
