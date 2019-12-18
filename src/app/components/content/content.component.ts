import {
  HttpClient,
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faAngleDoubleRight,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const SETTINGS = {
  AZURE_FUNCTION_URL: 'https://kirkland-websites-send-mail.azurewebsites.net/api/SendEmail',
  CODE: '5C010Zoo56teZYRWK009HvkgdIRBhDa1E03s7SD8zx6SQbdjXFoihA==',
  FORM_CODE: 'code',
  FORM_BUDGET: 'budget',
  FORM_BUSINESS: 'business',
  FORM_EMAIL: 'email',
  FORM_MESSAGE: 'message',
  FORM_NAME: 'name',
  FORM_NEEDSPHOTO: 'needsPhoto',
  FORM_NEEDSVIDEO: 'needsVideo',
  FORM_NEEDSWEBSITE: 'needsWebsite',
  FORM_PHONE: 'phone'
};

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public contactForm: FormGroup;
  public isFormSubmitted: boolean;

  public faAngleDoubleRight = faAngleDoubleRight;
  public faAngleRight = faAngleRight;

  business: string;
  budget: string;
  email: string;
  message: string;
  name: string;
  needsPhoto = false;
  needsVideo = false;
  needsWebsite = false;
  phone: string;

  constructor(    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      budget: new FormControl('', [Validators.required]),
      business: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      needsWebsite: new FormControl('', [Validators.required]),
      needsPhoto: new FormControl('', [Validators.required]),
      needsVideo: new FormControl('', [Validators.required]),
    });
  }


  getName(): void {
    console.log('website: ' + this.needsWebsite);
    console.log('photo: ' + this.needsPhoto);
    console.log('video: ' + this.needsVideo);
    console.log('budget: ' + this.budget);
  }


  public async onSubmitContactForm(): Promise<void> {
    if (this.contactForm.valid) {
      const endpoint = `${SETTINGS.AZURE_FUNCTION_URL}?
${SETTINGS.FORM_CODE}=${SETTINGS.CODE}
&${SETTINGS.FORM_NAME}=${encodeURIComponent(this.contactForm.get(SETTINGS.FORM_NAME).value)}
&${SETTINGS.FORM_EMAIL}=${encodeURIComponent(this.contactForm.get(SETTINGS.FORM_EMAIL).value)}
&${SETTINGS.FORM_BUSINESS}=${encodeURIComponent(this.contactForm.get(SETTINGS.FORM_BUSINESS).value)}
&${SETTINGS.FORM_MESSAGE}=${encodeURIComponent(this.contactForm.get(SETTINGS.FORM_MESSAGE).value)}`;

      try {
        this.http.get(endpoint).subscribe((result: any) => {
          // result
        }, (error: any) => {
          // error
        }, () => {
          // complete
        });
      } catch {
        // issue submitting form
      }

      this.isFormSubmitted = true;
    }
  }
}
