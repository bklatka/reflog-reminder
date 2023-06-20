# Reminder of what you did
Based on reflog it can save all the checkouts you've did which more or less indicates what you were working on 

## Setup
1. Run `yarn` to install dependency
2. Copy `.env.sample` as `.env` and put relative path to your project
3. run `yarn start` or setup cron. You can also do `yarn weeklyRun` for output in file

## Options with yarn start
`--afterDate 2023-05-20` Will output data from `2023-05-20`
`--all` Will output as much data as possible

## Run in cron & forget about the problem
Run cron with `crontab -e` in terminal and add

```
0 9 * * MON cd ~/projects/tempo-reminder && yarn weeklyRun
```

This will run script on every monday at 9:00 and save report from previous week to output folder