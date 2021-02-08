import { EntityRepository, Repository } from 'typeorm';
import { ProtrackEntity } from './protrack.entity';

@EntityRepository(ProtrackEntity)
export class ProtrackRepository extends Repository<ProtrackEntity> {}
