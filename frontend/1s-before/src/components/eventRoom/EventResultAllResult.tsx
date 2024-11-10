import EventEachResult from '@/components/eventRoom/EventResultEachResult';
import { useState, useEffect, useRef } from 'react';
import { EventRoomResultViewInfo } from '@/types/eventRoom';
import RankingDummy from '@/mocks/RankingDummy.json';

export default function EventResultAllResult() {
  const [displayItems, setDisplayItems] = useState<EventRoomResultViewInfo[]>([]);
  const [stacks, setStacks] = useState<EventRoomResultViewInfo[][]>([]); // Array of stacked items
  const [isStackExpanded, setIsStackExpanded] = useState<boolean[]>([]); // State to manage each stack's expansion
  const nextIndex = useRef(15); // Track the next item index to add

  useEffect(() => {
    // Initial display setup with first 15 items, stacking the first 10
    const initialItems = RankingDummy.slice(0, 15);
    const initialStack = initialItems.slice(0, 10); // First 10 items as a stack
    const remainingItems = initialItems.slice(10); // Remaining 5 items displayed individually

    setStacks([initialStack]);
    setDisplayItems(remainingItems);

    const addItemInterval = setInterval(() => {
      setDisplayItems((prevItems) => {
        if (nextIndex.current < RankingDummy.length) {
          const updatedItems = [...prevItems, RankingDummy[nextIndex.current]];
          nextIndex.current += 1; // Increment nextIndex reliably
          console.log(updatedItems.length, nextIndex.current);

          // Every 10 items, create a new stack
          if (updatedItems.length === 10) {
            setStacks((prevStacks) => [...prevStacks, updatedItems]);
            setIsStackExpanded((prevExpanded) => [...prevExpanded, false]);
            return [];
          }
          return updatedItems;
        } else {
          clearInterval(addItemInterval); // Stop when all items are added
          return prevItems;
        }
      });
    }, 500); // 0.5 seconds for each new item

    return () => clearInterval(addItemInterval); // Cleanup on unmount
  }, []);

  const toggleStack = (index: number) => {
    setIsStackExpanded((prevExpanded) =>
      prevExpanded.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <div className='flex flex-col gap-5'>
      {stacks.map((stack, index) => (
        <div key={`stack-${index}`} className='cursor-pointer' onClick={() => toggleStack(index)}>
          <div className='bg-gray-200 p-4 rounded'>
            {isStackExpanded[index] ? (
              stack.map((item) => (
                <EventEachResult
                  key={item.memberId}
                  eventId={item.eventId}
                  memberId={item.memberId}
                  joinedAt={item.joinedAt}
                  ranking={item.ranking}
                  isWinner={item.isWinner}
                  isMine={item.isMine}
                />
              ))
            ) : (
              <div className='text-center'>Stack of {stack.length} items (click to expand)</div>
            )}
          </div>
        </div>
      ))}
      {displayItems.map((item) => (
        <div
          key={item.memberId}
          className='transition-transform duration-500 ease-in-out transform opacity-90'>
          <EventEachResult
            eventId={item.eventId}
            memberId={item.memberId}
            joinedAt={item.joinedAt}
            ranking={item.ranking}
            isWinner={item.isWinner}
            isMine={item.isMine}
          />
        </div>
      ))}
    </div>
  );
}
