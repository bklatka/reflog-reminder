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

## Example output
```
Day:2023-06-19
        08:00:00        11:19:18        ABC-23_log-data
        11:19:18        13:12:16        ABC-515_cleanup-boundary
Day:2023-06-16
        08:00:00        10:29:28        ABC-1111_add-test-tools
        10:29:28        10:44:24        ABC-19739_refactor-low-balance
        10:44:24        10:48:04        ABC-19742_onboarding
        10:48:04        10:55:28        MOB-19627_performance-monitor
        10:55:28        11:17:56        ABC-19739_refactor
        11:17:56        11:20:56        ABC-19751_add-test-tools
Day:2023-06-14
        08:00:00        09:24:01        MOB-19627_performance-monitor
        09:24:01        09:40:57        ABC-19686_docs-for-something
        09:40:57        10:05:54        MOB-19627_performance-monitor
        10:05:54        10:12:43        ABC-19686_docs-for-something
        10:12:43        13:55:56        ABC-19750_fix-something
        13:55:56        14:40:48        ABC-19739_refactor-something

```