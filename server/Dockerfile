    # Bun runtime
    FROM oven/bun:1

    # app directory
    WORKDIR /app

    # dependencies
    COPY package.json bun.lock* ./
    RUN bun install --frozen-lockfile

    # copy src
    COPY . .

    # Expose port (informational)
    EXPOSE 3003

    # Run the app using your script
    CMD ["bun", "run", "start"]