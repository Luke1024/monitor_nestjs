import { ContactDto } from "./contact-dto";

export class CreateUserDto {
    readonly key:string;
    readonly logged:string;
    readonly contacts: ContactDto[];
}