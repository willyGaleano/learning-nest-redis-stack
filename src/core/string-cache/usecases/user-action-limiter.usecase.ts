import { Injectable } from '@nestjs/common';
import { StringCacheRepository } from '@/shared/cache/repositories/string-cache.repository';

export type UserActionLimiterResponse = {
  attempt: number;
  valid: boolean;
};

@Injectable()
export class UserActionLimiterUsecase {
  private readonly PREFIX = 'userlimiter:';
  constructor(private readonly stringCacheRepository: StringCacheRepository) {}

  async execute(
    userId: string,
    limit: number,
    ttl: number,
  ): Promise<UserActionLimiterResponse> {
    const key = `${this.PREFIX}${userId}`;
    const currentCount = await this.stringCacheRepository.incr(key);

    if (currentCount > limit) return { attempt: currentCount, valid: false };

    if (currentCount === 1) await this.stringCacheRepository.expire(key, ttl);

    return { attempt: currentCount, valid: true };
  }
}
