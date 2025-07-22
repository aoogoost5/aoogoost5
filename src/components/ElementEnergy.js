import React from 'react';
import { Box, Heading, Text, Flex, Progress, Badge } from '@chakra-ui/react';

const elementColors = {
  木: 'green',
  火: 'red',
  土: 'yellow',
  金: 'gray',
  水: 'blue'
};

const getStatusColor = (status) => {
  switch (status) {
    case '太旺': return 'red.500';
    case '偏旺': return 'orange.500';
    case '平衡': return 'green.500';
    case '偏弱': return 'yellow.500';
    case '太弱': return 'red.500';
    default: return 'gray.500';
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case '太旺': return { color: 'red', text: '太旺' };
    case '偏旺': return { color: 'orange', text: '偏旺' };
    case '平衡': return { color: 'green', text: '平衡' };
    case '偏弱': return { color: 'yellow', text: '偏弱' };
    case '太弱': return { color: 'purple', text: '太弱' };
    default: return { color: 'gray', text: '未知' };
  }
};

export default function ElementEnergy({ elementStrength = {}, elementStatus = {} }) {
  // 检查参数是否有效
  if (!elementStrength || Object.keys(elementStrength).length === 0) {
    return (
      <Box>
        <Heading as="h3" size="md" mb={4}>五行能量分析</Heading>
        <Text color="gray.500">数据不可用</Text>
      </Box>
    );
  }
  // 计算最大值，用于进度条比例
  const maxStrength = Math.max(...Object.values(elementStrength));
  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>五行能量分析</Heading>
      {Object.entries(elementStrength).map(([element, strength]) => {
        const status = elementStatus[element] || '未知';
        const statusBadge = getStatusBadge(status);
        return (
          <Box key={element} mb={3}>
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontWeight="bold">{element}</Text>
              <Flex align="center">
                <Text mr={2}>{strength}</Text>
                <Badge colorScheme={statusBadge.color} fontSize="xs">
                  {statusBadge.text}
                </Badge>
              </Flex>
            </Flex>
            <Progress 
              value={(strength / maxStrength) * 100} 
              colorScheme={elementColors[element]} 
              size="sm" 
              borderRadius="full"
            />
          </Box>
        );
      })}
    </Box>
  );
}