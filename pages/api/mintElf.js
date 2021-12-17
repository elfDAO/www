import cors from 'cors';
import cache from 'express-redis-cache';
import axios from 'axios';

const c = cache();

const run = (req, res) => (fn) => new Promise((resolve, reject) => {
  fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
  )
})

