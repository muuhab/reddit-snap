import { useInfiniteQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import TabsNavigation from '../components/ui/TabsNavigation';



jest.mock('axios');
jest.mock('@tanstack/react-query');
jest.mock('@mantine/hooks', () => ({
  useIntersection: jest.fn(() => ({ ref: {}, entry: { isIntersecting: true } })),
}));


describe('TabsNavigation component', () => {
  it('renders loading state initially', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isPending: true,
      fetchNextPage: jest.fn(),
    });
    render(<TabsNavigation />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders subreddits after data is fetched', async () => {
    const mockSubredditData = {
      pages: [
        {
          data: {
            data: {
              after: 'nextPageToken',
              children: [
                { data: { id: '1', title: 'Subreddit 1' } },
                { data: { id: '2', title: 'Subreddit 2' } },
              ],
            },
          },
        }
      ]
    };
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: mockSubredditData,
      isFetched: true,
      isPending: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });



    render(<TabsNavigation />);

    await waitFor(() => {
      expect(screen.getByText('Subreddit 1')).toBeInTheDocument();
      expect(screen.getByText('Subreddit 2')).toBeInTheDocument();
    });
  });



});
