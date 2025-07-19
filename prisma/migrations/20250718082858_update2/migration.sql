-- CreateTable
CREATE TABLE `artifacts` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `member_id` CHAR(36) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    INDEX `artifacts_member_id_idx`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` CHAR(36) NOT NULL,
    `upi_id` VARCHAR(255) NOT NULL,
    `email_id` VARCHAR(255) NOT NULL,
    `ig_username` VARCHAR(255) NOT NULL,
    `profile_image` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `members_upi_id_key`(`upi_id`),
    UNIQUE INDEX `members_email_id_key`(`email_id`),
    UNIQUE INDEX `members_ig_username_key`(`ig_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artifacts` ADD CONSTRAINT `artifacts_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
