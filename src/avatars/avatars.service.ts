import { Injectable } from '@nestjs/common';
import * as jdenticon from 'jdenticon';
import { v4 as uuidv4 } from 'uuid';
import * as svg2png from 'svg2png';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as process from "node:process";

@Injectable()
export class AvatarsService {
  private readonly avatarDirectory = path.join(process.cwd(), 'uploads', 'avatars');

  constructor() {
    fs.ensureDirSync(this.avatarDirectory);
  }

  async generateAndSaveAvatar(username: string): Promise<string> {
    try {
      const svg = jdenticon.toSvg(username, 200);
      const pngBuffer = await svg2png(Buffer.from(svg));

      const filename = `${uuidv4()}.png`;
      const filePath = path.join(this.avatarDirectory, filename)

      await fs.writeFile(filePath, pngBuffer);

      return filename;
    } catch (error) {
      console.error('Error generating or saving avatar:', error);
      throw new Error('Failed to generate avatar');
    }
  }

  getAvatarPath(filename: string): string {
    return path.join(this.avatarDirectory, filename);
  }
}