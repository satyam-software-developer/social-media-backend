import { createPost } from './postController';
import PostRepository from '../repositories/postRepository';

jest.mock('../repositories/postRepository');

describe('createPost', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      user: { id: 'user-id' },
      body: {
        content: 'Test content',
        imageURL: 'https://example.com/image.jpg',
        linkURL: 'https://example.com',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new post and return it', async () => {
    const createdPost = {
      _id: 'post-id',
      content: 'Test content',
      imageURL: 'https://example.com/image.jpg',
      linkURL: 'https://example.com',
      user: { email: 'test@example.com' },
    };

    PostRepository.createPost.mockResolvedValueOnce(createdPost);
    PostRepository.populate.mockResolvedValueOnce(createdPost);

    await createPost(req, res, next);

    expect(PostRepository.createPost).toHaveBeenCalledWith(
      'user-id',
      'Test content',
      'https://example.com/image.jpg',
      'https://example.com'
    );
    expect(PostRepository.populate).toHaveBeenCalledWith(createdPost, {
      path: 'user',
      select: 'email',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdPost);
    expect(next).not.toHaveBeenCalled();
  });

  test('should handle errors and call next', async () => {
    const error = new Error('Test error');
    PostRepository.createPost.mockRejectedValueOnce(error);

    await createPost(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});