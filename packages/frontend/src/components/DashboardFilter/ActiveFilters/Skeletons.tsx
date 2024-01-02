import { Group, Skeleton } from '@mantine/core';

const SkeletonGroup = ({ length }: { length: number }) => {
    return (
        <Group spacing="xs" ml="xs">
            {Array.from({ length }, (_, i) => (
                <Skeleton h={30} w={100} radius={4} key={i} />
            ))}
        </Group>
    );
};

export default SkeletonGroup;
