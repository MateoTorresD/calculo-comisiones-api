import { IsISO8601, Matches } from 'class-validator';

const DATE_YYYY_MM_DD = /^\d{4}-\d{2}-\d{2}$/;

export class GetCommissionsQueryDto {
  @Matches(DATE_YYYY_MM_DD, {
    message: 'startDate debe tener formato YYYY-MM-DD',
  })
  @IsISO8601({ strict: true }, { message: 'startDate no es una fecha válida' })
  startDate: string;

  @Matches(DATE_YYYY_MM_DD, {
    message: 'endDate debe tener formato YYYY-MM-DD',
  })
  @IsISO8601({ strict: true }, { message: 'endDate no es una fecha válida' })
  endDate: string;
}
