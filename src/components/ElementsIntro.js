import React from 'react';
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaTree, FaFire, FaMountain, FaGem, FaWater } from 'react-icons/fa';

const elementData = [
  {
    name: '木',
    icon: FaTree,
    color: 'green.500',
    description: '代表生长、发展、向上，与春季、东方相关。性格特点：仁爱、温和、有创造力。',
    traits: ['创新', '成长', '灵活', '决策力']
  },
  {
    name: '火',
    icon: FaFire,
    color: 'red.500',
    description: '代表热情、扩张、光明，与夏季、南方相关。性格特点：热情、活力、直觉敏锐。',
    traits: ['热情', '表达', '领导力', '洞察力']
  },
  {
    name: '土',
    icon: FaMountain,
    color: 'yellow.500',
    description: '代表稳定、中和、承载，与四季交替、中央相关。性格特点：踏实、稳重、可靠。',
    traits: ['稳定', '实际', '可靠', '包容']
  },
  {
    name: '金',
    icon: FaGem,
    color: 'gray.500',
    description: '代表收敛、坚强、锋利，与秋季、西方相关。性格特点：公正、果断、条理分明。',
    traits: ['纪律', '精确', '条理', '执行力']
  },
  {
    name: '水',
    icon: FaWater,
    color: 'blue.500',
    description: '代表智慧、流动、适应，与冬季、北方相关。性格特点：聪明、灵活、善于沟通。',
    traits: ['智慧', '沟通', '适应性', '洞察力']
  }
];

export default function ElementsIntro() {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={6} textAlign="center">五行元素介绍</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {elementData.map((element) => (
          <Box 
            key={element.name}
            p={5} 
            borderRadius="lg" 
            boxShadow="md" 
            bg="white"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            transition="all 0.3s"
          >
            <VStack align="start" spacing={3}>
              <HStack>
                <Icon as={element.icon} w={8} h={8} color={element.color} />
                <Heading as="h3" size="md" color={element.color}>{element.name}元素</Heading>
              </HStack>
              
              <Text fontSize="sm">{element.description}</Text>
              
              <Box>
                <Text fontWeight="bold" mb={1} fontSize="xs">关键特质:</Text>
                <HStack spacing={2} flexWrap="wrap">
                  {element.traits.map((trait) => (
                    <Box 
                      key={trait} 
                      bg={`${element.color.split('.')[0]}.100`}
                      color={element.color}
                      px={2} 
                      py={1} 
                      borderRadius="md"
                      fontSize="xs"
                    >
                      {trait}
                    </Box>
                  ))}
                </HStack>
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
} 