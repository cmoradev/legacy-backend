import { HttpService, Injectable } from '@nestjs/common';
import { AcademicStudent } from './interfaces/academic-student.interface';

@Injectable()
export class AcademicService {
    constructor(private readonly httpService: HttpService) {
    }

    async getAllStudents(): Promise<AcademicStudent[]> {
        const { data: students } = await this.httpService.get<AcademicStudent[]>('https://cuingles.academic.lat/api/ctrlescolar/alumnos/', {
            headers: {
                Authorization: 'Basic bC9wVHJma2IrQnVxZFhvdGYvbHFIQU43ZHNhZzkwT1FHbUcxZ2UrMFFjc1NGU1JhTEcrQVJjeEtHRE9yYy8xa1dMemg5RzZyWmlQanpFM25wc2NGalE9PQ==',
                ContentType: 'application/json',
            },
        }).toPromise();
        return students;
    }
}
