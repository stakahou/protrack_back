import { applyDecorators, UseGuards } from '@nestjs/common';
import { GoogleGuard } from '../guards/google.guard';

export const Google = () => applyDecorators(UseGuards(GoogleGuard));
