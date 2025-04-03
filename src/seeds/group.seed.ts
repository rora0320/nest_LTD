import { DataSource } from 'typeorm';
import { GroupEntity } from '../users/entities/group.entity';

export const seedGroups = async (dataSource: DataSource) => {
  const groupRepository = dataSource.getRepository(GroupEntity);

  const groups = [
    { groupCode: 200, groupValue: '엔진' },
    { groupCode: 300, groupValue: '연료' },
    { groupCode: 400, groupValue: '변속기' },
    { groupCode: 500, groupValue: '섀시' },
    { groupCode: 600, groupValue: '바디' },

    { groupCode: 800, groupValue: '트림' },
    { groupCode: 900, groupValue: '전장' },
    { groupCode: 999, groupValue: '페인트' },
  ];

  for (const group of groups) {
    const existingGroup = await groupRepository.findOneBy({
      groupCode: group.groupCode,
    });
    if (!existingGroup) {
      await groupRepository.save(group);
    }
  }

  console.log('✅ GroupEntity seeding completed!');
};
